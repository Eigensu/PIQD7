'use client';

import { useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

type HealthResponse = {
  status: string;
  service: string;
};

export default function HealthCheck() {
  const [result, setResult] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function checkBackend() {
    setError(null);
    setResult(null);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setResult((await response.json()) as HealthResponse);
    } catch {
      setError(
        'Backend unavailable. Start the API on port 4000 and try again.',
      );
    }
  }

  return (
    <>
      <button type="button" onClick={checkBackend}>
        Check backend
      </button>
      {result && <output>{`${result.service}: ${result.status}`}</output>}
      {error && <output>{error}</output>}
    </>
  );
}
