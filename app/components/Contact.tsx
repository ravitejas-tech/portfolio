import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  ArrowUpRight,
  Copy,
  Check,
  FileText,
  MessageSquare,
  ArrowUp,
} from "lucide-react";
import { PERSONAL, NAV_LINKS } from "~/data/portfolio";
import { ScrollReveal } from "~/components/shared/ScrollReveal";
import { SectionLabel } from "~/components/shared/SectionLabel";

const LinkedInIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(PERSONAL.email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = PERSONAL.email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const channels = [
    {
      label: "Phone",
      value: PERSONAL.phoneDisplay,
      href: `tel:${PERSONAL.phone}`,
      icon: <Phone size={16} />,
      external: false,
    },
    {
      label: "WhatsApp",
      value: "Quick message",
      href: `https://wa.me/${PERSONAL.phone.replace("+", "")}?text=Hi%20Raviteja,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.`,
      icon: <MessageSquare size={16} />,
      external: true,
    },
    {
      label: "LinkedIn",
      value: "Raviteja Salva",
      href: PERSONAL.linkedin,
      icon: <LinkedInIcon className="w-4 h-4" />,
      external: true,
    },
    {
      label: "GitHub",
      value: "ravitejas-tech",
      href: PERSONAL.github,
      icon: <GitHubIcon className="w-4 h-4" />,
      external: true,
    },
  ];

  const meta = [
    { label: "Response", value: "Within 24 hours" },
    { label: "Location", value: "Pune, India · IST" },
    { label: "Work mode", value: "Remote / relocation" },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/4 right-0 w-[520px] h-[420px] rounded-full pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, rgba(200, 245, 66, 0.05) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="section-container">
        <SectionLabel label="Contact & Inquiries" number="07" />

        {/* Header - matches section pattern */}
        <ScrollReveal>
          <div className="max-w-[900px] mb-6">
            <h2 className="text-display mb-6">
              Let&apos;s build something{" "}
              <span className="relative inline-block">
                <span className="text-[var(--color-accent)]">remarkable</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-[var(--color-accent)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                />
              </span>
              .
            </h2>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-[700px]">
              Have a role, a project, or a hard problem worth talking through?
              Email is the fastest way to reach me, and everything else below works too.
            </p>
          </div>
        </ScrollReveal>

        {/* Availability strip */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-4 md:gap-6 mb-14">
            <div className="inline-flex items-center gap-2.5 text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-mono text-xs">
                Available for full-time roles
              </span>
            </div>
            <div className="flex-1 h-px bg-[var(--color-border)]" />
          </div>
        </ScrollReveal>

        {/* Body - asymmetric two column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT - primary email + channels */}
          <div className="lg:col-span-7 space-y-4">
            <ScrollReveal delay={0.15}>
              <div className="surface-card rounded-2xl p-6 md:p-7 border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 transition-colors duration-300">
                <div className="flex items-center gap-2.5 mb-5">
                  <Mail size={15} className="text-[var(--color-accent)]" />
                  <span className="text-label text-[var(--color-text-tertiary)]">
                    Primary contact
                  </span>
                </div>

                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="block font-mono text-lg md:text-2xl text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors break-all mb-6"
                >
                  {PERSONAL.email}
                </a>

                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={`mailto:${PERSONAL.email}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg)] text-mono text-xs font-semibold hover:bg-[var(--color-accent-dim)] transition-colors"
                  >
                    <span>Send email</span>
                    <ArrowUpRight size={14} />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-border-hover)] text-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-[var(--color-accent)]" />
                        <span className="text-[var(--color-accent)]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={PERSONAL.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-border-hover)] text-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                  >
                    <FileText size={14} />
                    <span>Resume</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Channel rows */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {channels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="surface-card rounded-xl px-4 py-3.5 flex items-center gap-3 border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 transition-colors duration-300 group"
                  >
                    <span className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors shrink-0">
                      {channel.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-mono text-xs text-[var(--color-text)] block">
                        {channel.label}
                      </span>
                      <span className="text-mono text-[0.68rem] text-[var(--color-text-tertiary)] truncate block">
                        {channel.value}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors shrink-0"
                    />
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT - meta details */}
          <ScrollReveal delay={0.25} className="lg:col-span-5">
            <div className="lg:pl-4 lg:border-l border-[var(--color-border)] space-y-6">
              {meta.map((item) => (
                <div key={item.label}>
                  <span className="text-label text-[var(--color-text-tertiary)] block mb-1.5">
                    {item.label}
                  </span>
                  <span className="text-mono text-sm text-[var(--color-text)]">
                    {item.value}
                  </span>
                </div>
              ))}

              <div className="pt-6 border-t border-[var(--color-border)]">
                <p className="text-mono text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  Open to full-time engineering roles, contract work, and
                  technical conversations. No pitch necessary; a few lines about
                  what you&apos;re building is enough.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-fine-t bg-[var(--color-bg-elevated)]/60 backdrop-blur-md pt-12 pb-8">
      <div className="section-container">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <a
              href="#"
              className="text-heading text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors inline-block"
            >
              {PERSONAL.name}
              <span className="text-[var(--color-accent)]">.</span>
            </a>
            <p className="text-mono text-xs text-[var(--color-text-secondary)] max-w-[360px] leading-relaxed">
              Full Stack Developer specializing in high-performance web applications, mobile engineering, and distributed backend architectures.
            </p>
            <div className="pt-2 text-mono text-xs text-[var(--color-text-tertiary)]">
              Pune, India · {PERSONAL.email}
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4">
            <span className="text-label text-[var(--color-text-tertiary)] block mb-4">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={PERSONAL.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mono text-xs text-[var(--color-accent)] hover:underline inline-flex items-center gap-0.5"
              >
                <span>Resume</span>
                <ArrowUpRight size={11} />
              </a>
            </div>
          </div>

          {/* Direct Socials & Action */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-label text-[var(--color-text-tertiary)] block mb-4">
              Direct Channels
            </span>
            <div className="flex flex-wrap gap-2">
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-[var(--color-text-secondary)] transition-colors"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[#0077b5] hover:text-[#0077b5] text-[var(--color-text-secondary)] transition-colors"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={`mailto:${PERSONAL.email}`}
                className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-[var(--color-text-secondary)] transition-colors"
                aria-label="Email"
                title="Send Email"
              >
                <Mail size={16} />
              </a>
              <a
                href={`tel:${PERSONAL.phone}`}
                className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-sky-400 hover:text-sky-400 text-[var(--color-text-secondary)] transition-colors"
                aria-label="Call"
                title="Call phone"
              >
                <Phone size={16} />
              </a>
              <a
                href={PERSONAL.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-[var(--color-text-secondary)] transition-colors"
                aria-label="View Resume"
                title="Resume PDF"
              >
                <FileText size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-mono text-[0.72rem] text-[var(--color-text-tertiary)]">
            © {new Date().getFullYear()} {PERSONAL.name}. Built with React Router, TypeScript & Framer Motion.
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-mono text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp
              size={13}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
