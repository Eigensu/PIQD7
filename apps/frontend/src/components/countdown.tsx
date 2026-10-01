'use client';

import { useEffect, useState } from 'react';
import { DROP_ENDS, pad } from '../lib/brands';

function remaining() {
  const ms = Math.max(0, new Date(DROP_ENDS).getTime() - Date.now());
  return {
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
      <div className="label">Drop closes in</div>
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
      <strong>01</strong>
      <span>
        Live until
        <br />
        20 Sep 2026
      </span>
    </div>
  );
}
