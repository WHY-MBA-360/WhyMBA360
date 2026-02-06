'use client';

import React, { use } from 'react';

type PageProps = {
  params: Promise<{
    code: string;
  }>;
};

export default function CollegeDrilldown(props: PageProps) {
  // ✅ REQUIRED in Next.js 15
  const { code } = use(props.params);

  return (
    <div style={{ padding: 24 }}>
      <h1>College Drilldown</h1>

      <p>
        College Code: <b>{code}</b>
      </p>

      <div style={{ marginTop: 16 }}>
        <a href="/operator/outreach">Go to Outreach Hub →</a>
      </div>
    </div>
  );
}
