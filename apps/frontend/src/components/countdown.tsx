'use client';

import { useEffect, useState } from 'react';
import { DROP_ENDS, DROP_ENDS_LABEL, DROP_NUMBER, pad } from '../lib/brands';

function remaining() {
  const ms = Math.max(0, new Date(DROP_ENDS).getTime() - Date.now());
  return {
    closed: ms === 0,
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
  };
}

export function Countdown() {
  const [t, setT] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    setT(remaining());
    const id = window.setInterval(() => setT(remaining()), 60000);
    return () => window.clearInterval(id);
  }, []);

  const v = (n?: number) => (n === undefined ? '--' : pad(n));
  return (
    <div className="countdown-box">
      <div className="countdown-label">
        {t?.closed ? 'Drop closed' : 'Drop closes in'}
      </div>
      <div className="countdown" aria-label="Countdown">
        <span>
          {v(t?.days)}
          <small>days</small>
        </span>
        <span>
          {v(t?.hours)}
          <small>hrs</small>
        </span>
        <span>
          {v(t?.minutes)}
          <small>min</small>
        </span>
      </div>
    </div>
  );
}

export function DropStamp() {
  return (
    <div className="drop-stamp" aria-hidden="true">
      <strong>{DROP_NUMBER}</strong>
      <span>
        Live until
        <br />
        {DROP_ENDS_LABEL}
      </span>
    </div>
  );
}
