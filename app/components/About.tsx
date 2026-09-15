import { PERSONAL } from "~/data/portfolio";
import { ScrollReveal } from "~/components/shared/ScrollReveal";
import { SectionLabel } from "~/components/shared/SectionLabel";

export function About() {
  return (
    <section
      id="about"
      className="section-padding bg-[var(--color-bg-elevated)] border-fine-t border-fine-b"
    >
      <div className="section-container">
        <SectionLabel label="About" number="06" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          {/* Left - Identity */}
          <ScrollReveal>
            <div>
              <h2 className="text-display mb-8">
                Raviteja
                <span className="text-[var(--color-text-secondary)]">
                  {" "}
                  Salva
                </span>
              </h2>

              {/* Meta details */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="accent-dot" />
                  <span className="text-mono text-[var(--color-text-secondary)]">
                    {PERSONAL.location}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="accent-dot" />
                  <span className="text-mono text-[var(--color-text-secondary)]">
                    {PERSONAL.role}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="accent-dot" />
                  <span className="text-mono text-[var(--color-text-secondary)]">
                    ~2 years experience
                  </span>
                </div>
              </div>

              {/* Social & Action links */}
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={PERSONAL.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mono text-[0.75rem] text-[var(--color-bg)] bg-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] font-semibold transition-colors px-3 py-1.5 rounded"
                >
                  Resume ↗
                </a>
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mono text-[0.75rem] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)] transition-colors border-fine px-3 py-1.5 rounded"
                >
                  GitHub
                </a>
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mono text-[0.75rem] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)] transition-colors border-fine px-3 py-1.5 rounded"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="text-mono text-[0.75rem] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)] transition-colors border-fine px-3 py-1.5 rounded"
                >
                  Email
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Narrative */}
          <ScrollReveal delay={0.15}>
            <div className="space-y-6">
              <p className="text-body-lg text-[var(--color-text-secondary)]">
                I&apos;m a Full Stack Developer currently based in Pune, India.
                I work at the intersection of frontend experiences and backend
                systems, building products that serve real users at scale.
              </p>
              <p className="text-body-lg text-[var(--color-text-secondary)]">
                Over the past ~2 years, I&apos;ve contributed to 8+ production
                projects, from a Coca-Cola mobile app live in 119 countries to
                crypto prediction platforms handling hundreds of thousands of
                daily requests. I&apos;ve grown from a Junior Frontend Developer
                to leading small teams and owning entire product lifecycles.
              </p>
              <p className="text-body-lg text-[var(--color-text-secondary)]">
                I believe in understanding the full system. Whether it&apos;s
                designing database schemas, building REST APIs, crafting mobile
                interfaces, or setting up deployment pipelines, I like to know
                how the pieces fit together. I use tools like React, React
                Native, NestJS, TypeORM, PostgreSQL, Docker, and Kubernetes
                daily.
              </p>
              <p className="text-body-lg text-[var(--color-text-secondary)]">
                Outside of work, I build open source developer tools like
                Gitmomos and QueryFish, and experiment with AI-powered
                applications. I care about developer experience, clean
                architecture, and shipping software that actually works.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
