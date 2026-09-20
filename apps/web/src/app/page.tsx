import HealthCheck from './health-check';

export default function Home() {
  return (
    <main>
      <section>
        <p>Full-stack starter</p>
        <h1>NestJS + Next.js</h1>
        <p>
          A minimal monorepo template with independent apps managed by pnpm and
          Turborepo.
        </p>
        <HealthCheck />
      </section>
    </main>
  );
}
