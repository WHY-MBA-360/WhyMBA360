'use client';

import { useEffect, useState } from 'react';

export default function ApiTestPage() {
  const [result, setResult] = useState<string>('Loading...');

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/')
      .then(res => res.text())
      .then(text => setResult(text))
      .catch(() => setResult('API call failed'));
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Frontend → Backend API Test</h1>
      <p>{result}</p>
    </main>
  );
}
