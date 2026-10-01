'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DROP_SIZE, brands, imageUrl, pad } from '../lib/brands';
import { Heart } from './icons';
import { useSite } from './site-provider';

type Decision = 'lov' | 'pass';

const peek = [
  {
    n: '05',
    title: ['Form /', 'function.'],
    place: 'Pune / India',
    photo: brands[3].image,
  },
  {
    n: '04',
    title: ['House of', 'Sunday.'],
    place: 'Bengaluru / India',
    photo: brands[2].image,
  },
  {
    n: '03',
    title: ['Common', 'thread.'],
    place: 'Mumbai / India',
    photo: brands[1].image,
  },
  {
    n: '02',
    title: ['Ode to', 'form.'],
    place: 'Jaipur / India',
    photo: brands[3].image,
  },
];

export function DropDeck() {
  const { edit, lov } = useSite();
  const [index, setIndex] = useState(0);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [leaving, setLeaving] = useState(0);
  const [entering, setEntering] = useState(false);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [toast, setToast] = useState<{ id: number; msg: string } | null>(null);
  const [celebrate, setCelebrate] = useState(0);
  const startX = useRef(0);
  const busy = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => window.clearTimeout(id));
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const brand = brands[index];
  const position = index + 1;

  const decide = useCallback(
    (type: Decision) => {
      if (busy.current) return;
      busy.current = true;
      const current = brands[index];
      const dir = type === 'lov' ? 1 : -1;
      setDecision(type);
      setLeaving(dir);
      setDrag(0);
      setDragging(false);

      if (type === 'lov') {
        lov(current.id);
        setCelebrate((c) => c + 1);
      }
      const label = `${current.name} ${current.subtitle.replace(/\.$/, '')}`;
      setToast({
        id: Date.now(),
        msg:
          type === 'lov'
            ? `${label} was added to Your Edit.`
            : `${label} passed. Next brand coming up.`,
      });
      later(() => setToast(null), 2600);

      later(() => {
        setIndex((i) => (i + 1) % brands.length);
        setLeaving(0);
        setEntering(true);
        window.requestAnimationFrame(() =>
          window.requestAnimationFrame(() => {
            setEntering(false);
            setDecision(null);
            busy.current = false;
          }),
        );
      }, 430);
    },
    [index, lov],
  );

  const cardStyle: React.CSSProperties = leaving
    ? {
        transform: `translateX(${leaving * 120}%) rotate(${leaving * 8}deg)`,
        opacity: 0,
      }
    : entering
      ? {
          transform: 'translateY(14px) scale(.94)',
          opacity: 0,
          transition: 'none',
        }
      : dragging || drag
        ? {
            transform: `translateX(${drag}px) rotate(${drag / 28}deg)`,
            opacity: drag > 0 ? Math.max(0.35, 1 - drag / 360) : 1,
            transition: dragging ? 'none' : undefined,
          }
        : {};

  const dragLabel: Decision | null =
    Math.abs(drag) > 35 ? (drag > 0 ? 'lov' : 'pass') : null;
  const shownLabel = decision ?? dragLabel;
  const others = brands.filter((b) => b.id !== brand.id).slice(0, 3);

  return (
    <>
      <section className="page-head">
        <div className="eyebrow">
          Drop 01 / seven independent brands / unlocked
        </div>
        <h1>
          Your drop is <em>live.</em>
        </h1>
        <p>
          Lov what stays with you, pass what does not. Drag the card, or use the
          buttons.
        </p>
      </section>

      <section
        id="drop"
        className="deck-layout"
        aria-label="Current brand drop"
      >
        <div className="card-stack">
          {peek.map((p, i) => (
            <article
              className="peek-card"
              key={p.n}
              style={{
                ['--i' as string]: i,
                backgroundImage: `url('${imageUrl(p.photo, 900)}')`,
              }}
            >
              <small>{p.n} / 07</small>
              <div>
                <strong>
                  {p.title[0]}
                  <br />
                  {p.title[1]}
                </strong>
                <span>{p.place}</span>
              </div>
            </article>
          ))}
          <span className="swipe-hint pass">PASS</span>
          <span className="swipe-hint lov">LOV</span>
          <article
            className={`brand-card${dragging ? ' is-dragging' : ''}`}
            style={cardStyle}
            onPointerDown={(e) => {
              if (busy.current) return;
              startX.current = e.clientX;
              setDragging(true);
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (dragging) setDrag(e.clientX - startX.current);
            }}
            onPointerUp={() => {
              if (!dragging) return;
              setDragging(false);
              if (Math.abs(drag) > 90) decide(drag > 0 ? 'lov' : 'pass');
              else setDrag(0);
            }}
            onPointerCancel={() => {
              setDragging(false);
              setDrag(0);
            }}
          >
            <div
              className="brand-image"
              role="img"
              aria-label={`${brand.name} ${brand.subtitle} editorial image`}
              style={{
                backgroundImage: `url('${imageUrl(brand.image, 1200, 85)}')`,
              }}
            />
            <div className={`decision-label${shownLabel ? ' show' : ''}`}>
              {shownLabel === 'pass' ? 'PASS' : 'LOV'}
            </div>
            <div className="card-content">
              <div className="card-top">
                <span>{pad(position)} / 07</span>
                <span>{brand.location}</span>
              </div>
              <div>
                <h2>
                  <span>{brand.name}</span> <em>{brand.subtitle}</em>
                </h2>
                <p className="brand-intro">{brand.intro}</p>
                <div className="facts">
                  {brand.facts.map((f) => (
                    <span className="fact" key={f}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <span className="image-credit">
              Brand {pad(position)} / Just Lovedit
            </span>
          </article>
        </div>

        <aside className="side-panel">
          <div>
            <div className="eyebrow">Your weekly edit</div>
            <h3>
              Seven cards.
              <br />
              Make them <em>count.</em>
            </h3>
            <p>
              Horizontal movement is for your decision. Lov it, or pass for now.
            </p>
            <div className="progress-wrap">
              <div className="progress-head">
                <span>Your progress</span>
                <span>
                  {pad(position)} of {pad(DROP_SIZE)}
                </span>
              </div>
              <div className="progress" aria-label="Drop progress">
                {Array.from({ length: DROP_SIZE }, (_, i) => (
                  <i
                    key={i}
                    className={
                      i < index ? 'seen' : i === index ? 'current' : ''
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="side-actions">
            <button
              type="button"
              className="action primary"
              onClick={() => decide('lov')}
            >
              <strong>Lov it</strong>
              <Heart />
            </button>
            <button
              type="button"
              className="action"
              onClick={() => decide('pass')}
            >
              <strong>Pass for now</strong>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </aside>
      </section>

      <section className="below">
        <div>
          <div className="section-heading">
            <h3>More from this drop</h3>
            <a href="#drop">Browse all 07 →</a>
          </div>
          <div className="brand-strip">
            {others.map((b) => (
              <article
                className="mini-card"
                key={b.id}
                style={{
                  ['--photo' as string]: `url('${imageUrl(b.image, 600)}')`,
                }}
              >
                <small>{pad(brands.indexOf(b) + 1)} / 07</small>
                <strong>
                  {b.name}
                  <br />
                  <em>{b.subtitle.replace(/\.$/, '')}</em>
                </strong>
              </article>
            ))}
          </div>
        </div>
        <aside className="saved-panel">
          <div className="eyebrow">Your collection</div>
          <h3>
            The brands
            <br />
            you <em>keep.</em>
          </h3>
          <div className="saved-number">{pad(edit.length)}</div>
          <Link href="/edit">Open Your Edit →</Link>
        </aside>
      </section>

      {celebrate > 0 && (
        <div
          className="lov-celebration show"
          key={celebrate}
          aria-hidden="true"
        >
          Lov it!
        </div>
      )}
      <div className={`toast${toast ? ' show' : ''}`} role="status">
        {toast && (
          <>
            <span className="toast-heart">
              <Heart size={11} />
            </span>
            {toast.msg}
          </>
        )}
      </div>
    </>
  );
}
