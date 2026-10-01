'use client';

import Link from 'next/link';
import { brands, imageUrl, pad } from '../lib/brands';
import { useSite } from './site-provider';

export function EditList() {
  const { edit, remove } = useSite();
  const saved = brands.filter((b) => edit.includes(b.id));

  return (
    <div className="shell">
      <section className="page-head">
        <div className="eyebrow">Your collection</div>
        <h1>
          Your <em>Edit.</em>
        </h1>
        <p>
          {saved.length
            ? `${pad(saved.length)} ${saved.length === 1 ? 'brand' : 'brands'} you chose to keep from this drop.`
            : 'Everything you lov lands here, ready to revisit anytime.'}
        </p>
      </section>

      {saved.length ? (
        <section className="edit-grid" aria-label="Brands in Your Edit">
          {saved.map((b) => (
            <article
              className="edit-card"
              key={b.id}
              style={{
                ['--photo' as string]: `url('${imageUrl(b.image, 700)}')`,
              }}
            >
              <div className="card-top">
                <span>{pad(brands.indexOf(b) + 1)} / 07</span>
                <span>{b.location}</span>
              </div>
              <div>
                <h2>
                  {b.name} <em>{b.subtitle}</em>
                </h2>
                <div className="facts">
                  {b.facts.map((f) => (
                    <span className="fact" key={f}>
                      {f}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="remove"
                  onClick={() => remove(b.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-edit">
          <h2>
            Nothing here <em>yet.</em>
          </h2>
          <p>Lov a brand and it lands in Your Edit.</p>
          <Link className="btn btn-primary" href="/brands">
            See this week&rsquo;s drop <span aria-hidden="true">→</span>
          </Link>
        </section>
      )}
    </div>
  );
}
