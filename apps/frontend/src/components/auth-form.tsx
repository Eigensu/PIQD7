'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Mode = 'register' | 'signin';

const copy = {
  register: {
    step: 'Step 01 of 02 · Registration',
    h1: ['One account.', 'Seven brands', 'waiting for you.'],
    lead: "Your account unlocks this week's drop, saves what you lov to Your Edit, and remembers what you're into for next week.",
    title: 'Create your account',
    sub: 'Takes less than a minute. This unlocks the brand drop.',
    submit: 'Create account & continue',
  },
  signin: {
    step: 'Welcome back',
    h1: ['Welcome back.', 'Your Edit', 'is waiting.'],
    lead: "Sign in to pick up where you left off. This week's seven brands are live.",
    title: 'Sign in',
    sub: 'Use the email you registered with.',
    submit: 'Sign in & continue',
  },
} as const;

// Mockup only: nothing is created or verified yet. Real signup and
// sign-in (Google + form, backed by the API) land in a follow-up PR.
export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const c = copy[mode];
  const register = mode === 'register';

  return (
    <div className="layout">
      <section className="promo">
        <div>
          <div className="eyebrow">Drop 01 / seven independent brands</div>
          <h1>
            {c.h1[0]}
            <br />
            {c.h1[1]}
            <br />
            <em>{c.h1[2]}</em>
          </h1>
          <p>{c.lead}</p>
          <div className="promo-steps">
            <div className="promo-step active">
              <span className="dot">1</span>
              <span className="step-label">
                {register ? 'Create your account' : 'Sign in'}
              </span>
            </div>
            <div className="promo-step">
              <span className="dot">2</span>
              <span className="step-label">
                Discover this week&rsquo;s drop
              </span>
            </div>
          </div>
        </div>
        <div className="promo-foot">{c.step}</div>
      </section>

      <section className="form-side">
        <div className="form-card">
          <h2>{c.title}</h2>
          <p className="sub">{c.sub}</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push('/brands');
            }}
          >
            {register && (
              <div className="field-row">
                <div className="field">
                  <label htmlFor="first-name">First name</label>
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    placeholder="Ananya"
                    autoComplete="given-name"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="last-name">Last name</label>
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    placeholder="Rao"
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>
            )}
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@email.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder={
                  register ? 'Minimum 8 characters' : 'Your password'
                }
                autoComplete={register ? 'new-password' : 'current-password'}
                required
                minLength={register ? 8 : undefined}
              />
              {register && (
                <div className="hint">
                  Use at least 8 characters, with a number.
                </div>
              )}
            </div>

            {register && (
              <div className="checkbox-row">
                <input id="terms" type="checkbox" required />
                <label htmlFor="terms">
                  I agree to the <strong>Terms of Service</strong> and{' '}
                  <strong>Privacy Policy</strong>, and to receive updates about
                  future drops.
                </label>
              </div>
            )}

            <button className="submit-btn" type="submit">
              {c.submit} <span aria-hidden="true">→</span>
            </button>
          </form>

          <div className="divider">or continue with</div>
          <div className="alt-actions">
            <button
              className="alt-btn"
              type="button"
              disabled
              title="Coming soon"
            >
              Continue with Google
            </button>
            <button
              className="alt-btn"
              type="button"
              disabled
              title="Coming soon"
            >
              Continue with Apple
            </button>
          </div>

          <div className="switch-link">
            {register ? (
              <>
                Already have an account? <Link href="/signin">Sign in</Link>
              </>
            ) : (
              <>
                New here? <Link href="/register">Create your account</Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
