'use client';

import { useEffect, useState } from 'react';

import {
  auth,
  db,
} from '../../lib/firebase';

import {
  onAuthStateChanged,
} from 'firebase/auth';

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import Header from '../../components/Header';
import Editor from '../../components/Editor';
import PythonPlayground from '../../components/PythonPlayground';
import LivePresentation from '../../components/LivePresentation';
import PptxFreeViewer from '../../components/PptxFreeViewer';



export default function Live() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [students, setStudents] = useState([]);
  const [admin, setAdmin] = useState(false);

  const [question, setQuestion] = useState(
    'Live Python demonstration'
  );

  const [presentationCode, setPresentationCode] = useState(
    'print("Hello students!")'
  );
  const [currentMode, setCurrentMode] = useState('presentation');
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenMessage, setFullscreenMessage] = useState('');
  const [profile, setProfile] = useState(null);
  const [firebaseError, setFirebaseError] = useState('');
  // =========================================================
  // AUTHENTICATION
  // =========================================================

useEffect(() => {
  if (!auth) {
    setFirebaseError('Firebase Authentication is not available.');
    return;
  }

  return onAuthStateChanged(
    auth,
    (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        setFirebaseError('');
      }
    },
    (error) => {
      console.error(
        'Firebase authentication listener error:',
        error
      );

      setFirebaseError(
        error?.message ||
        'Firebase authentication connection failed.'
      );
    }
  );
}, []);


  // =========================================================
  // CURRENT LIVE SESSION
  // =========================================================

  useEffect(() => {
    if (!user) return;

    return onSnapshot(
      doc(db, 'liveSessions', 'current'),

      (snapshot) => {

       if (snapshot.exists()) {
  const data = snapshot.data();

  setSession(data);

  setCurrentMode(
    data.currentMode || 'presentation'
  );
} else {
  setSession(null);
  setCurrentMode('presentation');
}



        setFirebaseError('');
      },

      (error) => {
        console.error(
          'Live session listener error:',
          error
        );

        setFirebaseError(
          error?.message ||
          'Unable to connect to the live session database.'
        );
      }
    );
  }, [user]);


  // =========================================================
  // USER PROFILE / ADMIN STATUS
  // =========================================================


useEffect(() => {
  if (!user) return;

  return onSnapshot(
    doc(db, 'users', user.uid),

    (snapshot) => {
      const data = snapshot.data() || {};

      setProfile(data);

      setAdmin(
        data.admin === true ||
        data.rollNumber === 'admin'
      );

      setFirebaseError('');
    },

    (error) => {
      console.error(
        'User profile listener error:',
        error
      );

      setFirebaseError(
        error?.message ||
        'Unable to load your Firebase user profile.'
      );
    }
  );
}, [user]);


  // =========================================================
  // ADMIN — LIVE PARTICIPANTS
  // =========================================================

  useEffect(() => {
    if (!user || !admin) return;

    return onSnapshot(
      collection(db, 'liveParticipants'),
      (snapshot) => {
        setStudents(
          snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data(),
          }))
        );
      }
    );
  }, [user, admin]);

  // =========================================================
  // STUDENT — REGISTER FOR LIVE SESSION
  // =========================================================

  useEffect(() => {
    if (
      !user ||
      admin ||
      !session?.active
    ) {
      return;
    }

    let cancelled = false;

    async function registerStudent() {
      try {
        const profileSnapshot = await getDoc(
          doc(db, 'users', user.uid)
        );

        if (cancelled) return;

        const data = profileSnapshot.exists()
          ? profileSnapshot.data()
          : {};

        await setDoc(
          doc(db, 'liveParticipants', user.uid),
          {
            uid: user.uid,

            name:
              data.name ||
              user.displayName ||
              'Student',

            email:
              data.email ||
              user.email ||
              '',

            rollNumber:
              data.rollNumber ||
              '',

            joinedAt: serverTimestamp(),

            sessionId:
              session.id ||
              'current',

            fullscreen: false,

            fullscreenStatus:
              'WAITING',

            lastFullscreenEvent:
              'SESSION_JOINED',

            lastFullscreenChange:
              serverTimestamp(),
          },
          { merge: true }
        );
      } catch (error) {
        console.error(
          'Unable to register live participant:',
          error
        );
      }
    }

    registerStudent();

    return () => {
      cancelled = true;
    };
  }, [
    user,
    admin,
    session?.active,
    session?.id,
  ]);

  // =========================================================
  // STUDENT — FULLSCREEN MONITOR
  // =========================================================

  useEffect(() => {
    if (
      !user ||
      admin ||
      !session?.active
    ) {
      return;
    }

    function handleFullscreenChange() {
      const isFullscreen =
        Boolean(document.fullscreenElement);

      setFullscreen(isFullscreen);

      if (isFullscreen) {
        setFullscreenMessage('');

        setDoc(
          doc(
            db,
            'liveFullscreenStatus',
            user.uid
          ),
          {
            uid: user.uid,

            name:
              profile?.name ||
              user.displayName ||
              'Student',

            email:
              profile?.email ||
              user.email ||
              '',

            rollNumber:
              profile?.rollNumber ||
              '',

            fullscreen: true,

            fullscreenStatus:
              'FULLSCREEN',

            lastFullscreenEvent:
              'ENTERED_FULLSCREEN',

            sessionId:
              session.id ||
              'current',

            lastChangedAt:
              serverTimestamp(),
          },
          { merge: true }
        ).catch((error) => {
          console.error(
            'Unable to record fullscreen state:',
            error
          );
        });

      } else {
        setFullscreenMessage(
          'You have exited Full Screen. Please return to Full Screen to continue the live class.'
        );

        setDoc(
          doc(
            db,
            'liveFullscreenStatus',
            user.uid
          ),
          {
            uid: user.uid,

            name:
              profile?.name ||
              user.displayName ||
              'Student',

            email:
              profile?.email ||
              user.email ||
              '',

            rollNumber:
              profile?.rollNumber ||
              '',

            fullscreen: false,

            fullscreenStatus:
              'EXITED_FULLSCREEN',

            lastFullscreenEvent:
              'EXITED_FULLSCREEN',

            sessionId:
              session.id ||
              'current',

            lastChangedAt:
              serverTimestamp(),
          },
          { merge: true }
        ).catch((error) => {
          console.error(
            'Unable to record fullscreen exit:',
            error
          );
        });
      }
    }

    document.addEventListener(
      'fullscreenchange',
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange
      );
    };
  }, [
    user,
    admin,
    session?.active,
    session?.id,
    profile,
  ]);

  // =========================================================
  // STUDENT — ENTER FULLSCREEN
  // =========================================================

  async function enterFullscreen() {
    try {
      await document.documentElement.requestFullscreen();

      setFullscreen(true);
      setFullscreenMessage('');
    } catch (error) {
      console.error(
        'Fullscreen request failed:',
        error
      );

      setFullscreenMessage(
        'Full Screen could not be activated. Please click the button again.'
      );
    }
  }

  // =========================================================
  // ADMIN — START SESSION
  // =========================================================

  async function startSession() {
    try {
      if (!user) {
        throw new Error('You are not signed in.');
      }

      if (!admin) {
        throw new Error(
          'Administrator access is not available for this account.'
        );
      }

      const sessionId =
        typeof crypto !== 'undefined' &&
        crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now());

      console.log('Starting live session...');
      console.log('User UID:', user.uid);
      console.log('User email:', user.email);
      console.log('Admin:', admin);

      await setDoc(
        doc(db, 'liveSessions', 'current'),
        {
          active: true,
          
          currentMode: 'presentation',
          presentationUrl: '',
          presentationName: '',
          currentSlide: 1,
          totalSlides: 0,

          id: sessionId,

          type: 'presentation',

          question:
            question.trim() ||
            'Live Python demonstration',

          selectedUid: null,

          sharedCode: null,

          sharedBy: null,

          sharedName: null,

          sharedRoll: null,

          startedAt:
            serverTimestamp(),
        }
      );

      console.log(
        'Live session started successfully:',
        sessionId
      );

      alert('✅ Live session started successfully.');

    } catch (error) {
      console.error(
        '❌ Unable to start live session:',
        error
      );

      alert(
        '❌ Unable to start live session.\\n\\n' +
        (error?.message || String(error))
      );
    }
  }

  // =========================================================
  // ADMIN — END SESSION
  // =========================================================

async function endSession() {
  try {
    if (!session?.active) {
      window.alert('There is no active live session.');
      return;
    }

    await setDoc(
      doc(db, 'liveSessions', 'current'),
      {
        active: false,
        endedAt: serverTimestamp(),
      },
      { merge: true }
    );

    console.log('Live session ended.');

    window.alert('⚫ Live session ended successfully.');
  } catch (error) {
    console.error(
      'Unable to end live session:',
      error
    );

    window.alert(
      '❌ Unable to end live session.\n\n' +
      (error?.message || String(error))
    );
  }
}
  // =========================================================
  // ADMIN — CLEAR SESSION
  // =========================================================

  async function clearSession() {
    const ok = window.confirm(
      'Delete the current live session data?'
    );

    if (!ok) return;

    await setDoc(
      doc(db, 'liveSessions', 'current'),
      {
        active: false,

        selectedUid: null,

        sharedCode: null,

        sharedBy: null,

        sharedName: null,

        sharedRoll: null,
      },
      { merge: true }
    );

    for (const student of students) {
      await deleteDoc(
        doc(
          db,
          'liveParticipants',
          student.id
        )
      );

      await deleteDoc(
        doc(
          db,
          'liveFullscreenStatus',
          student.id
        )
      );
    }

    setStudents([]);
  }

  // =========================================================
  // NOT SIGNED IN
  // =========================================================

  if (!user) {
    return (
      <main className="center">
        Please sign in first.
      </main>
    );
  }

  // =========================================================
  // ADMIN / TEACHER VIEW
  // =========================================================

  if (admin) {
    return (
      <>
        <Header profile={{ admin: true }} />

        <main className="live">

          <h1>
            Live Presentation
          </h1>
         <div
  style={{
    margin: '16px 0',
    padding: '16px 20px',
    borderRadius: '12px',
    border: session?.active
      ? '2px solid #16a34a'
      : '2px solid #dc2626',
    background: session?.active
      ? '#f0fdf4'
      : '#fef2f2',
  }}
>
  <div
    style={{
      fontSize: '20px',
      fontWeight: '700',
    }}
  >
    {session?.active
      ? '🟢 LIVE SESSION ACTIVE'
      : '🔴 LIVE SESSION OFFLINE'}
  </div>

  <div
    style={{
      marginTop: '8px',
      fontSize: '15px',
    }}
  >
    {session?.active
      ? 'Teacher is LIVE. Students can join the presentation.'
      : 'No live class is currently running.'}
  </div>

  {session?.active && (
    <div
      style={{
        marginTop: '10px',
        fontSize: '14px',
        opacity: 0.8,
      }}
    >
      Session ID: {session.id || '—'}
      <br />
      Students connected: {students.length}
    </div>
  )}
</div>

 {/* STEP 9 — FIREBASE ERROR */}
  {firebaseError && (
    <div
      style={{
        margin: '12px 0',
        padding: '14px 18px',
        borderRadius: '10px',
        border: '2px solid #dc2626',
        background: '#fef2f2',
        color: '#991b1b',
        fontWeight: '600',
      }}
    >
      ⚠️ Firebase connection problem
      <br />

      <span style={{ fontWeight: '400' }}>
        {firebaseError}
      </span>
    </div>
  )}

          <p>
            Teacher-controlled presentation
            and live Python demonstration.
          </p>

          <textarea
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            rows={3}
            placeholder="Enter the presentation topic or teaching instruction..."
          />

          <div className="actions">

<button
  onClick={startSession}
  disabled={session?.active}
>
  {session?.active
    ? '🟢 Live Session Running'
    : '▶ Start Live Session'}
</button>

<button
  className="secondary"
  onClick={endSession}
  disabled={!session?.active}
>
  {session?.active
    ? '■ End Live Session'
    : '■ Session Already Ended'}
</button>


            <button
              className="danger"
              onClick={clearSession}
            >
              Clear Session Data
            </button>

          </div>

          <div className="monitor">

            <section>

              <h2>
                Students ({students.length})
              </h2>

              {students.length === 0 ? (
                <p>
                  No students have joined yet.
                </p>
              ) : (
                students.map((student) => (
                  <StudentStatus
                    key={student.id}
                    student={student}
                  />
                ))
              )}

            </section>

<section>

  <div
    style={{
      display: 'flex',
      gap: '12px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    }}
  >

    <button
      type="button"
      onClick={async () => {
        try {
          await updateDoc(
            doc(
              db,
              'liveSessions',
              'current'
            ),
            {
              currentMode: 'presentation',
            }
          );

          setCurrentMode('presentation');

        } catch (error) {
          console.error(
            'Unable to switch to presentation mode:',
            error
          );
        }
      }}
      style={{
        fontWeight:
          currentMode === 'presentation'
            ? '700'
            : '400',
      }}
    >
      📊 Presentation
    </button>

    <button
      type="button"
      onClick={async () => {
        try {
          await updateDoc(
            doc(
              db,
              'liveSessions',
              'current'
            ),
            {
              currentMode: 'code',
            }
          );

          setCurrentMode('code');

        } catch (error) {
          console.error(
            'Unable to switch to code mode:',
            error
          );
        }
      }}
      style={{
        fontWeight:
          currentMode === 'code'
            ? '700'
            : '400',
      }}
    >
      💻 Python Code
    </button>

  </div>

  <PptxFreeViewer
    admin={true}
    session={session}
  />

</section>

<section>

  <h2>
    👨‍🏫 Teacher Python Demonstration
  </h2>

<PythonPlayground
  initialCode={presentationCode}
  onCodeChange={async (code) => {
    setPresentationCode(code);

    try {
      await updateDoc(
        doc(db, 'liveSessions', 'current'),
        {
          sharedCode: code,
          sharedBy: user?.uid || null,
          sharedName:
            user?.displayName ||
            user?.email ||
            'Teacher',
        }
      );
    } catch (error) {
      console.error(
        'Unable to share Python code:',
        error
      );
    }
  }}
  height="380px"
/>
</section>



          </div>

        </main>
      </>
    );
  }

  // =========================================================
  // STUDENT VIEW — NO EDITOR
  // =========================================================
const studentMode =
  session?.currentMode || 'presentation';


  if (!session?.active) {
    return (
      <>
        <Header profile={{ admin: false }} />

        <main className="live">

          <h1>
            Live Presentation
          </h1>

          <p>
            No live session is active.
          </p>

        </main>
      </>
    );
  }

  // =========================================================
  // STUDENT LIVE VIEW
  // =========================================================

  return (
    <>
      <Header profile={{ admin: false }} />

      <main className="live">

        <div className="live-question">

          <div className="live-badge">
            🔴 LIVE
          </div>

          <h1>
            Live Presentation
          </h1>

          <h2>
            {session.question}
          </h2>

        </div>

        {!fullscreen && (
          <section className="card">

            <h2>
              Enter Full Screen
            </h2>

            <p>
              This live class is intended to be
              viewed in Full Screen mode.
            </p>

            <button
              onClick={enterFullscreen}
            >
              ⛶ Enter Full Screen
            </button>

          </section>
        )}

        {fullscreen && (
          <section className="card">

            <div className="live-status">
              🟢 Full Screen Active
            </div>

            <h2>
              Teacher Presentation
            </h2>


{studentMode === 'presentation' ? (
  <PptxFreeViewer
    admin={false}
    session={session}
  />

) : (

  <PythonPlayground
    initialCode={
      session?.sharedCode ||
      'print("Waiting for teacher code...")'
    }
    readOnly={true}
    height="500px"
  />

)}

          </section>
        )}

        {fullscreenMessage && (
          <div className="python-playground-error">
            ⚠️ {fullscreenMessage}

            <br />

            <button
              onClick={enterFullscreen}
              style={{
                marginTop: '12px',
              }}
            >
              ⛶ Return to Full Screen
            </button>
          </div>
        )}

      </main>
    </>
  );
}

// =========================================================
// ADMIN STUDENT STATUS
// =========================================================

function StudentStatus({ student }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    return onSnapshot(
      doc(
        db,
        'liveFullscreenStatus',
        student.id
      ),
      (snapshot) => {
        setStatus(
          snapshot.exists()
            ? snapshot.data()
            : null
        );
      }
    );
  }, [student.id]);

  const isFullscreen =
    status?.fullscreen === true;

  const exited =
    status?.fullscreenStatus ===
    'EXITED_FULLSCREEN';

  return (
    <div
      className="student"
      style={{
        border:
          exited
            ? '2px solid #dc2626'
            : undefined,
      }}
    >

      <div>

        <b>
          {student.name}
        </b>

        <small>
          Roll No: {student.rollNumber}
        </small>

        <small>
          {student.email}
        </small>

      </div>

      <div>

        {isFullscreen ? (
          <strong>
            🟢 Full Screen
          </strong>
        ) : exited ? (
          <strong>
            🔴 EXITED FULL SCREEN
          </strong>
        ) : (
          <strong>
            🟡 Waiting
          </strong>
        )}

      </div>

    </div>
  );
}
