
'use client';

import { useEffect, useRef, useState } from 'react';

import {
  doc,
  updateDoc,
} from 'firebase/firestore';

import { db } from '../lib/firebase';

export default function PptxFreeViewer({
  admin = false,
  session = null,
}) {

  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  const [presentationUrl, setPresentationUrl] =
    useState('');

  const [fileName, setFileName] =
    useState('');

  const [slideNumber, setSlideNumber] =
    useState(1);

  const [slideCount, setSlideCount] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  // =====================================================
  // CLEANUP
  // =====================================================

  function destroyViewer() {
    try {
      viewerRef.current?.destroy?.();
    } catch (error) {
      console.warn(
        'PPTX viewer cleanup failed:',
        error
      );
    }

    viewerRef.current = null;

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
  }

  // =====================================================
  // LOAD PPTX FROM URL
  // =====================================================

  async function loadFromUrl(url) {
    if (!url) {
      setError(
        'Please enter a GitHub Raw PPTX URL.'
      );
      return;
    }

    if (
      !url.toLowerCase().includes('.pptx')
    ) {
      setError(
        'The URL must point to a .pptx PowerPoint file.'
      );
      return;
    }

    if (!containerRef.current) {
      setError(
        'PowerPoint display area is not available.'
      );
      return;
    }

    setError('');
    setLoading(true);

    try {
      console.log(
        'Loading PPTX:',
        url
      );

      // -------------------------------------------------
      // Download PPTX
      // -------------------------------------------------

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Unable to download PowerPoint. HTTP ${response.status}`
        );
      }

      const buffer =
        await response.arrayBuffer();

      if (!buffer || buffer.byteLength === 0) {
        throw new Error(
          'The downloaded PowerPoint file is empty.'
        );
      }

      // -------------------------------------------------
      // Load renderer
      // -------------------------------------------------

      const {
        PptxViewer,
        RECOMMENDED_ZIP_LIMITS,
      } = await import(
        '@aiden0z/pptx-renderer'
      );

      // -------------------------------------------------
      // Destroy previous viewer
      // -------------------------------------------------

      destroyViewer();

      // -------------------------------------------------
      // Create viewer
      // -------------------------------------------------

      const viewer =
        await PptxViewer.open(
          buffer,
          containerRef.current,
          {
            zipLimits:
              RECOMMENDED_ZIP_LIMITS,

            fitMode: 'contain',

            renderMode: 'slide',

            lazySlides: true,

            lazyMedia: true,
          }
        );

      viewerRef.current = viewer;

      // -------------------------------------------------
      // Get slide count
      // -------------------------------------------------

      const count =
        viewer.slideCount || 0;

      setSlideCount(count);

      // -------------------------------------------------
      // Determine filename
      // -------------------------------------------------

      let name = 'Presentation.pptx';

      try {
        const pathname =
          new URL(url).pathname;

        const last =
          pathname
            .split('/')
            .pop();

        if (last) {
          name =
            decodeURIComponent(last);
        }
      } catch {
        // Keep default filename
      }

      setFileName(name);

      // -------------------------------------------------
      // Start from slide 1
      // -------------------------------------------------

      setSlideNumber(1);

      await viewer.goToSlide(0);

      console.log(
        'PPTX loaded successfully.',
        {
          slides: count,
          name,
        }
      );

      // -------------------------------------------------
      // ADMIN:
      // Store presentation information
      // -------------------------------------------------

      if (admin) {
        await updateDoc(
          doc(
            db,
            'liveSessions',
            'current'
          ),
          {
            presentationUrl:
              url,

            presentationName:
              name,

            totalSlides:
              count,

            currentSlide:
              1,
          }
        );
      }

    } catch (err) {
      console.error(
        'PPTX loading failed:',
        err
      );

      setError(
        err?.message ||
        'Unable to load the PowerPoint file.'
      );

      setFileName('');
      setSlideCount(0);
      setSlideNumber(1);

      destroyViewer();

    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // CHANGE SLIDE
  // =====================================================

  async function goToSlide(number) {
    const viewer =
      viewerRef.current;

    if (!viewer) {
      return;
    }

    const maximum =
      slideCount || 1;

    const value = Math.max(
      1,
      Math.min(
        maximum,
        Number(number) || 1
      )
    );

    try {
      setError('');

      await viewer.goToSlide(
        value - 1
      );

      setSlideNumber(value);


      // ADMIN: synchronize the selected slide
      // with all students through Firestore.
      if (
        admin &&
        session?.active &&
        session?.id
      ) {
        try {
          await updateDoc(
            doc(
              db,
              'liveSessions',
              'current'
            ),
            {
              currentSlide: value,
              totalSlides: slideCount,
            }
          );
        } catch (syncError) {
          console.error(
            'Unable to synchronize slide:',
            syncError
          );
        }
      }

    } catch (err) {
      console.error(
        'Unable to change slide:',
        err
      );

      setError(
        err?.message ||
        'Unable to display this slide.'
      );
    }
  }

  // =====================================================
  // PREVIOUS
  // =====================================================

  async function previousSlide() {
    if (slideNumber <= 1) {
      return;
    }

    await goToSlide(
      slideNumber - 1
    );
  }

  // =====================================================
  // NEXT
  // =====================================================

  async function nextSlide() {
    if (
      slideCount > 0 &&
      slideNumber >= slideCount
    ) {
      return;
    }

    await goToSlide(
      slideNumber + 1
    );
  }

  // =====================================================
  // STUDENT:
  // FOLLOW TEACHER SLIDE
  // =====================================================

  useEffect(() => {
    if (admin) {
      return;
    }

    if (!session?.active) {
      return;
    }

    const target =
      Number(session.currentSlide) || 1;

    if (
      target === slideNumber
    ) {
      return;
    }

    if (!viewerRef.current) {
      return;
    }

    goToSlide(target);

  }, [
    admin,
    session?.active,
    session?.currentSlide,
  ]);

  // =====================================================
  // STUDENT:
  // LOAD PRESENTATION WHEN URL CHANGES
  // =====================================================

  useEffect(() => {
    if (admin) {
      return;
    }

    if (!session?.active) {
      return;
    }

    const url =
      session.presentationUrl;

    if (!url) {
      return;
    }

    if (
      url === presentationUrl
    ) {
      return;
    }

    setPresentationUrl(url);

    loadFromUrl(url);

  }, [
    admin,
    session?.active,
    session?.presentationUrl,
  ]);

  // =====================================================
  // CLEANUP
  // =====================================================

  useEffect(() => {
    return () => {
      destroyViewer();
    };
  }, []);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      style={{
        marginTop: '20px',
      }}
    >

      {/* =================================================
          ADMIN CONTROLS
          ================================================= */}

      {admin && (
        <>

          <h2>
            📊 Teacher PowerPoint
          </h2>

          <p>
            Use a GitHub Raw PPTX file.
            No Google Slides API.
            No Firebase Storage.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginTop: '12px',
              marginBottom: '12px',
              flexWrap: 'wrap',
            }}
          >

            <input
              type="text"
              value={presentationUrl}
              onChange={(event) =>
                setPresentationUrl(
                  event.target.value
                )
              }
              placeholder="Paste GitHub Raw .pptx URL..."
              style={{
                flex: 1,
                minWidth: '400px',
                padding: '12px',
                border:
                  '1px solid #cbd5e1',
                borderRadius: '8px',
              }}
            />

            <button
              type="button"
              onClick={() =>
                loadFromUrl(
                  presentationUrl
                )
              }
              disabled={loading}
            >
              {loading
                ? '⏳ Loading...'
                : '📊 Load PPTX'}
            </button>

          </div>

        </>
      )}

      {/* =================================================
          PRESENTATION INFORMATION
          ================================================= */}

      {fileName && (
        <div
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            fontWeight: '600',
          }}
        >
          📄 {fileName}
        </div>
      )}

      {loading && (
        <p>
          ⏳ Loading PowerPoint...
        </p>
      )}

      {/* =================================================
          ERROR
          ================================================= */}

      {error && (
        <div
          style={{
            marginTop: '12px',
            marginBottom: '12px',
            padding: '12px',
            border:
              '1px solid #dc2626',
            borderRadius: '8px',
            background: '#fef2f2',
            color: '#991b1b',
          }}
        >
          ❌ {error}
        </div>
      )}

      {/* =================================================
          TEACHER CONTROLS
          ================================================= */}

      {slideCount > 0 && admin && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '15px',
            marginBottom: '12px',
            flexWrap: 'wrap',
          }}
        >

          <button
            type="button"
            onClick={previousSlide}
            disabled={
              slideNumber <= 1
            }
          >
            ◀ Previous
          </button>

          <strong>
            Slide {slideNumber} / {slideCount}
          </strong>

          <button
            type="button"
            onClick={nextSlide}
            disabled={
              slideNumber >=
              slideCount
            }
          >
            Next ▶
          </button>

          <input
            type="number"
            min="1"
            max={slideCount}
            value={slideNumber}
            onChange={(event) =>
              goToSlide(
                event.target.value
              )
            }
            style={{
              width: '70px',
              padding: '8px',
            }}
          />

        </div>
      )}

      {/* =================================================
          STUDENT STATUS
          ================================================= */}

      {!admin &&
        session?.active &&
        slideCount > 0 && (
          <div
            style={{
              marginBottom: '12px',
              fontWeight: '600',
            }}
          >
            🟢 Teacher Presentation
            &nbsp; — &nbsp;
            Slide {slideNumber}
            {slideCount
              ? ` / ${slideCount}`
              : ''}
          </div>
        )}

      {/* =================================================
          PPTX DISPLAY
          ================================================= */}

      <div
        ref={containerRef}
        id="pptx-container"
        style={{
          width: '100%',
          minHeight: '500px',
          marginTop: '15px',
          background: '#111',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      />

    </section>
  );
}
