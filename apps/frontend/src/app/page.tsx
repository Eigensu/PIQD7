import Link from 'next/link';
import { Countdown, DropStamp } from '../components/countdown';
import { Heart, Lock } from '../components/icons';
import { brands, imageUrl, pad } from '../lib/brands';

const steps = [
  {
    title: 'Register',
    body: "Create a free account in under a minute. No brand names shown until you're in.",
    tone: 'wash',
  },
  {
    title: 'Discover',
    body: "Swipe through this week's seven independent brands, one editorial card at a time.",
    tone: 'blush',
  },
  {
    title: 'Lov or pass',
    body: 'Lov the ones that stay with you. Everything you lov lands in Your Edit.',
    tone: 'mulberry',
  },
];

const ticker = [
  'Slow fashion',
  'Small batch',
  'Upcycled',
  'Utility wear',
  'Find your uncommon.',
];

// Seven sealed cards: tone, tilt (deg) and vertical offset (px) for the fan.
const sealed = [
  { tone: 'mulberry', r: -6, y: 6, brand: 0 },
  { tone: 'blush', r: 3, y: 26, brand: 1 },
  { tone: 'butter', r: -3, y: -6, brand: 2 },
  { tone: 'ink', r: 5, y: 20, brand: 3 },
  { tone: 'wash', r: -5, y: 0, brand: -1 },
  { tone: 'mulberry', r: 2, y: 24, brand: -1 },
  { tone: 'blush', r: -4, y: 4, brand: -1 },
];

const photo = (i: number, w: number) =>
  `url('${imageUrl(brands[i].image, w)}')`;

export default function Landing() {
  return (
    <>
      <div className="shell">
        <section className="hero">
          <div>
            <div className="pill-tag">
              <Heart size={11} /> Drop 01 / seven independent brands
            </div>
            <h1>
              Find your
              <br />
              <em className="hl">uncommon.</em>
            </h1>
            <p className="hero-copy">
              One week. Seven labels worth knowing. Create your account to
              unlock this week&rsquo;s drop and start deciding what stays with
              you.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/register">
                Create your account <span aria-hidden="true">→</span>
              </Link>
              <a className="btn btn-ghost" href="#how">
                How it works
              </a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div
              className="art-card a"
              style={{ ['--photo' as string]: photo(0, 700) }}
            >
              <span className="art-name">
                Lilavai <em>studio.</em>
              </span>
            </div>
            <div
              className="art-card b"
              style={{ ['--photo' as string]: photo(2, 700) }}
            >
              <span className="art-name">
                House of <em>Sunday.</em>
              </span>
            </div>
            <div
              className="art-card c"
              style={{ ['--photo' as string]: photo(1, 600) }}
            >
              <span className="art-name">
                Common <em>thread.</em>
              </span>
            </div>
            <span className="sticker lov">
              Lov it <Heart size={13} />
            </span>
            <span className="sticker pass">Pass for now →</span>
            <div className="art-stamp">
              <DropStamp />
            </div>
            <div className="art-countdown">
              <Countdown />
            </div>
          </div>
        </section>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((n) => (
            <div className="marquee-group" key={n}>
              {ticker.map((t) => (
                <span key={t}>
                  {t}
                  <Heart size={18} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="shell">
        <section
          className="sealed-section"
          aria-label="This week's drop, locked"
        >
          <div className="sealed-head">
            <div>
              <div className="pill-tag">
                <Lock size={11} /> Sealed until you sign in
              </div>
              <h2>
                Seven cards.
                <br />
                One <em>secret.</em>
              </h2>
            </div>
            <div className="sealed-side">
              <p>
                The brands stay hidden until you&rsquo;re in. Pick a card to
                peek, then register to break the seal.
              </p>
              <Link className="btn btn-primary" href="/register">
                Unlock the drop <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="sealed-row">
            {sealed.map((s, i) => (
              <Link
                href="/register"
                className={`sealed tone-${s.tone}`}
                key={i}
                aria-label={`Locked brand ${pad(i + 1)} of 07. Create your account to unlock.`}
                style={{
                  ['--r' as string]: `${s.r}deg`,
                  ['--y' as string]: `${s.y}px`,
                  ['--d' as string]: `${i * 0.35}s`,
                }}
              >
                <span className="sealed-in">
                  {s.brand >= 0 && (
                    <span
                      className="sealed-photo"
                      style={{ ['--photo' as string]: photo(s.brand, 400) }}
                    />
                  )}
                  <span className="sealed-lock">
                    <Lock size={13} />
                  </span>
                  <span className="sealed-q">?</span>
                  <span className="sealed-foot">
                    <b>{pad(i + 1)} / 07</b>
                    <i>Peek →</i>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="how" className="how" aria-label="How Just Lovedit works">
          {steps.map((s, i) => (
            <div className={`how-step tone-${s.tone}`} key={s.title}>
              <div className="num">{pad(i + 1)}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="cta-band">
          <h3>
            Seven brands. One week. <em>Your call.</em>
          </h3>
          <Link className="btn btn-primary" href="/register">
            Create your account <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </>
  );
}
