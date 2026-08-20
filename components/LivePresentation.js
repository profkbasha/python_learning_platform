'use client';

import PptxFreeViewer from './PptxFreeViewer';

export default function LivePresentation({
  admin = false,
  session = null,
}) {
  return (
    <PptxFreeViewer
      admin={admin}
      session={session}
    />
  );
}
