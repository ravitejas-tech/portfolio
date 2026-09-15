import { PROOF_METRICS } from "~/data/portfolio";
import { ScrollReveal } from "~/components/shared/ScrollReveal";

export function ProofStrip() {
  return (
    <section className="border-fine-t border-fine-b bg-[var(--color-bg-elevated)]">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {PROOF_METRICS.map((metric, i) => (
            <ScrollReveal key={metric.label} delay={i * 0.1}>
              <div
                className={`py-8 md:py-12 px-4 md:px-6 text-center ${
                  i < PROOF_METRICS.length - 1
                    ? "border-r border-[var(--color-border)]"
                    : ""
                } ${i < 2 ? "border-b md:border-b-0 border-[var(--color-border)]" : ""}`}
              >
                <span className="block text-display text-[var(--color-accent)] mb-1">
                  {metric.value}
                </span>
                <span className="block text-label text-[var(--color-text)] mb-2">
                  {metric.label}
                </span>
                <span className="text-mono text-[0.65rem] text-[var(--color-text-tertiary)]">
                  {metric.context}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
