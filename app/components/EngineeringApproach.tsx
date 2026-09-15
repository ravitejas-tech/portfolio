import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCode2,
  Database,
  Cpu,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Terminal,
  ArrowRight,
} from "lucide-react";
import { ENGINEERING_PHASES } from "~/data/portfolio";
import { ScrollReveal } from "~/components/shared/ScrollReveal";
import { SectionLabel } from "~/components/shared/SectionLabel";

const ICONS = [FileCode2, Database, Cpu, ShieldCheck, Rocket];

const CODE_SNIPPETS = [
  `// 01: API Contract Definition
export interface CreateOrderDto {
  readonly userId: string;
  readonly vehicleId: string;
  readonly paymentMethod: 'upi' | 'card';
  readonly telemetryPing: GeoPoint;
}`,
  `// 02: Relational Schema & Indexing
@Entity('telemetry_events')
@Index(['vehicleId', 'timestamp'])
export class TelemetryEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column('jsonb') coordinates: Point;
}`,
  `// 03: Modular Service Execution
@Injectable()
export class PredictionEngine {
  constructor(
    @InjectRedis() private redis: Redis,
    private socketGateway: EventsGateway,
  ) {}
}`,
  `// 04: RBAC Guard & Hardening
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'PHYSICIAN')
@Throttle({ default: { limit: 100, ttl: 60000 } })
async handleSensitiveQuery() {}`,
  `// 05: Multi-Stage Dockerfile
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/main.js"]`,
];

export function EngineeringApproach() {
  const [activeStep, setActiveStep] = useState(0);
  const currentPhase = ENGINEERING_PHASES[activeStep];
  const CurrentIcon = ICONS[activeStep];

  return (
    <section
      id="approach"
      className="section-padding bg-[var(--color-bg-elevated)] border-fine-t border-fine-b"
    >
      <div className="section-container">
        <SectionLabel label="Engineering Approach" number="04" />

        <div className="max-w-[780px] mb-16">
          <h2 className="text-display mb-4">
            How I{" "}
            <span className="text-[var(--color-accent)]">think</span> about
            building.
          </h2>
          <p className="text-body-lg text-[var(--color-text-secondary)]">
            Production software requires more than just making features work on
            localhost. Here is my systematic engineering approach from initial
            schema contracts to zero-downtime deployment.
          </p>
        </div>

        {/* Interactive Engineering Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Step Selector Column */}
          <div className="lg:col-span-5 space-y-3">
            {ENGINEERING_PHASES.map((phase, idx) => {
              const StepIcon = ICONS[idx];
              const isActive = activeStep === idx;

              return (
                <button
                  key={phase.step}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border flex items-start gap-4 ${
                    isActive
                      ? "bg-[var(--color-bg-card)] border-[var(--color-accent)] shadow-lg shadow-[var(--color-accent)]/5"
                      : "bg-[var(--color-bg)]/60 border-[var(--color-border)] hover:border-[var(--color-border-hover)] opacity-70 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive
                        ? "bg-[var(--color-accent)] text-[var(--color-bg)]"
                        : "bg-[var(--color-bg-elevated)] text-[var(--color-text-tertiary)] border border-[var(--color-border)]"
                    }`}
                  >
                    <StepIcon size={18} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-mono text-[0.65rem] text-[var(--color-accent)] font-semibold">
                        PHASE {phase.step}
                      </span>
                      {isActive && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]" />
                        </span>
                      )}
                    </div>
                    <h4 className="text-subheading text-sm md:text-base font-semibold text-[var(--color-text)] truncate">
                      {phase.title}
                    </h4>
                    <p className="text-mono text-xs text-[var(--color-text-tertiary)] truncate mt-0.5">
                      {phase.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Deep Dive Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="surface-card rounded-3xl p-6 md:p-10 border border-[var(--color-border)] h-full flex flex-col justify-between"
              >
                <div>
                  {/* Phase Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/30 flex items-center justify-center">
                      <CurrentIcon size={18} />
                    </div>
                    <div>
                      <span className="text-mono text-[0.7rem] text-[var(--color-accent)] font-semibold">
                        PHASE {currentPhase.step} · LIFECYCLE
                      </span>
                      <h3 className="text-heading text-[var(--color-text)] font-semibold">
                        {currentPhase.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-body-lg text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                    {currentPhase.description}
                  </p>

                  {/* Concrete Deliverables */}
                  <div className="mb-6 p-5 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)]">
                    <span className="text-label text-[var(--color-text-tertiary)] block mb-3">
                      Concrete Deliverables &amp; Outcomes
                    </span>
                    <div className="space-y-2.5">
                      {currentPhase.deliverables.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2
                            size={16}
                            className="text-[var(--color-accent)] flex-shrink-0"
                          />
                          <span className="text-mono text-xs text-[var(--color-text-secondary)]">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Snippet */}
                  <div className="rounded-xl bg-[#09090b] border border-[var(--color-border)] p-4 mb-6 font-mono text-xs text-emerald-400/90 overflow-x-auto">
                    <div className="flex items-center gap-2 text-mono text-[0.65rem] text-[var(--color-text-tertiary)] mb-2 pb-2 border-b border-[var(--color-border)]">
                      <Terminal size={12} />
                      <span>architecture-pattern.ts</span>
                    </div>
                    <pre className="text-[0.75rem] leading-relaxed text-zinc-300">
                      <code>{CODE_SNIPPETS[activeStep]}</code>
                    </pre>
                  </div>
                </div>

                {/* Footer tags & navigation buttons */}
                <div className="pt-4 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {currentPhase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-mono text-[0.65rem] px-2.5 py-1 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-tertiary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setActiveStep((prev) =>
                          prev === 0 ? ENGINEERING_PHASES.length - 1 : prev - 1
                        )
                      }
                      className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                    >
                      Prev
                    </button>
                    <button
                      onClick={() =>
                        setActiveStep((prev) =>
                          prev === ENGINEERING_PHASES.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg)] text-mono text-xs font-medium hover:bg-[var(--color-accent-dim)] transition-colors flex items-center gap-1"
                    >
                      <span>Next Phase</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
