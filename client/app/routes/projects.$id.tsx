import { useParams, Link, Navigate } from "react-router";
import { motion } from "framer-motion";
import { getProjectById } from "~/data/projects";
import { Navbar } from "~/components/Navbar";

export function meta({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);
  return [
    {
      title: project ? `${project.name} — Raviteja Salva` : "Project Not Found",
    },
    { name: "description", content: project?.tagline ?? "" },
  ];
}

// Projects whose screenshots are mobile/portrait
const MOBILE_PROJECTS = new Set(["ko-mark", "surge", "synergy"]);

function RevealBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: "10px",
        letterSpacing: "0.2em",
        color: "#E8001A",
        textTransform: "uppercase",
        fontWeight: 600,
        marginBottom: "16px",
        fontFamily: "monospace",
      }}
    >
      {children}
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id ?? "");

  if (!project) return <Navigate to="/" replace />;

  const isMobile = MOBILE_PROJECTS.has(project.id);
  const hasScreenshots = project.screenshots.length > 0;

  const statusColor =
    project.status === "live"
      ? "#00C850"
      : project.status === "ongoing"
        ? "#E8A200"
        : "rgba(255,255,255,0.4)";
  const statusBorder =
    project.status === "live"
      ? "rgba(0,200,80,0.4)"
      : project.status === "ongoing"
        ? "rgba(232,162,0,0.4)"
        : "rgba(255,255,255,0.15)";
  const statusLabel =
    project.status === "live"
      ? "LIVE"
      : project.status === "ongoing"
        ? "ONGOING"
        : "PLANNED";

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      {/* Site Navbar */}
      <Navbar />

      {/* Back button */}
      <div
        style={{
          paddingTop: "88px",
          paddingLeft: "clamp(24px,6vw,80px)",
          paddingRight: "clamp(24px,6vw,80px)",
          paddingBottom: "0",
        }}
      >
        <RevealBlock>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              letterSpacing: "0.05em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
            }
          >
            ← Back
          </Link>
        </RevealBlock>
      </div>

      {/* Two-column hero */}
      <div style={{ padding: "48px clamp(24px,6vw,80px) 0" }}>
        <div
          className="project-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px,6vw,80px)",
            alignItems: "center",
          }}
        >
          {/* Left: meta + title */}
          <RevealBlock>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              {project.company && (
                <span
                  style={{
                    fontSize: "10px",
                    color: "#E8001A",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontFamily: "monospace",
                  }}
                >
                  {project.company}
                </span>
              )}
              <span
                style={{
                  fontSize: "10px",
                  padding: "2px 10px",
                  border: `1px solid ${statusBorder}`,
                  color: statusColor,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {statusLabel}
              </span>
            </div>

            <h1
              style={{
                fontWeight: 900,
                fontSize: "clamp(36px,5vw,64px)",
                color: "#ffffff",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              {project.name}
            </h1>

            <p
              style={{
                fontWeight: 300,
                fontSize: "clamp(16px,1.8vw,20px)",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.65,
                marginBottom: "20px",
                maxWidth: "480px",
              }}
            >
              {project.tagline}
            </p>

            <p
              style={{
                fontFamily: "monospace",
                fontSize: "11px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "32px",
              }}
            >
              Role / {project.role}
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {project.links && project.links.length > 0 && (
                <a
                  href={project.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "10px 24px",
                    background: "#E8001A",
                    color: "white",
                    fontSize: "13px",
                    fontWeight: 600,
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#c70016")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#E8001A")
                  }
                >
                  {project.links[0].label} ↗
                </a>
              )}
              <Link
                to="/#contact"
                style={{
                  padding: "10px 24px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "13px",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(232,0,26,0.5)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                Work with Ravi
              </Link>
            </div>
          </RevealBlock>

          {/* Right: Thumbnail */}
          <RevealBlock delay={0.15}>
            <div
              style={{
                overflow: "hidden",
                position: "relative",
                aspectRatio: "16/10",
              }}
              className="project-hero-image"
            >
              <img
                src={project.thumbnail}
                alt={project.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "3px",
                  height: "60px",
                  background: "#E8001A",
                }}
              />
            </div>
          </RevealBlock>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          margin: "60px clamp(24px,6vw,80px) 0",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      />

      {/* Content body */}
      <div style={{ padding: "0 clamp(24px,6vw,80px) 80px" }}>
        {/* Two-column: narrative left, sticky sidebar right */}
        <div
          className="project-content-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: "clamp(48px,6vw,80px)",
            alignItems: "start",
            maxWidth: "1400px",
            margin: "0 auto",
            paddingTop: "60px",
          }}
        >
          {/* Left: story + highlights + challenges */}
          <div>
            <RevealBlock delay={0.2}>
              <div style={{ marginBottom: "60px" }}>
                <SectionLabel>The Story</SectionLabel>
                <p
                  style={{
                    fontSize: "17px",
                    lineHeight: "1.85",
                    color: "rgba(255,255,255,0.65)",
                    fontWeight: 300,
                  }}
                >
                  {project.story}
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.3}>
              <div style={{ marginBottom: "60px" }}>
                <SectionLabel>Key Highlights</SectionLabel>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      style={{ paddingLeft: "24px", position: "relative" }}
                    >
                      <span
                        style={{
                          color: "#E8001A",
                          position: "absolute",
                          left: 0,
                          fontFamily: "monospace",
                          fontSize: "14px",
                        }}
                      >
                        →
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          lineHeight: "1.8",
                          color: "rgba(255,255,255,0.65)",
                          fontWeight: 300,
                        }}
                      >
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.35}>
              <div>
                <SectionLabel>Challenges Solved</SectionLabel>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {project.challenges.map((c, i) => (
                    <li
                      key={i}
                      style={{ paddingLeft: "24px", position: "relative" }}
                    >
                      <span
                        style={{
                          color: "#E8001A",
                          position: "absolute",
                          left: 0,
                          fontFamily: "monospace",
                          fontSize: "14px",
                        }}
                      >
                        →
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          lineHeight: "1.8",
                          color: "rgba(255,255,255,0.65)",
                          fontWeight: 300,
                        }}
                      >
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Right: sticky sidebar */}
          <RevealBlock delay={0.25}>
            <div style={{ position: "sticky", top: "100px" }}>
              {/* Tech Stack */}
              <div
                style={{
                  marginBottom: "32px",
                  padding: "24px",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <SectionLabel>Tech Stack</SectionLabel>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "5px 12px",
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.55)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta summary card */}
              <div
                style={{
                  padding: "24px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  marginBottom: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.3)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Role
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "white",
                      fontWeight: 500,
                    }}
                  >
                    {project.role}
                  </div>
                </div>

                {project.company && (
                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      Client
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "white",
                        fontWeight: 500,
                      }}
                    >
                      {project.company}
                    </div>
                  </div>
                )}

                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.3)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Status
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      padding: "2px 10px",
                      border: `1px solid ${statusBorder}`,
                      color: statusColor,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      display: "inline-block",
                    }}
                  >
                    {statusLabel}
                  </div>
                </div>
              </div>

              {/* Links */}
              {project.links && project.links.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "10px 20px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.65)",
                        fontSize: "13px",
                        textDecoration: "none",
                        letterSpacing: "0.04em",
                        transition: "all 0.2s",
                        display: "block",
                        textAlign: "center",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(232,0,26,0.5)";
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.background =
                          "rgba(232,0,26,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.15)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </RevealBlock>
        </div>

        {/* Full-width: Screenshots */}
        {hasScreenshots && (
          <RevealBlock delay={0.4}>
            <div
              style={{
                marginTop: "60px",
                marginBottom: "60px",
                maxWidth: "1400px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <SectionLabel>Screenshots</SectionLabel>
              {isMobile ? (
                <div style={{ overflow: "hidden" }}>
                  <div
                    className="screenshot-marquee-inner"
                    style={{
                      display: "flex",
                      gap: "16px",
                      animationDuration: `${project.screenshots.length * 4}s`,
                    }}
                  >
                    {[...project.screenshots, ...project.screenshots].map(
                      (src, i) => (
                        <div
                          key={i}
                          style={{
                            flex: "0 0 240px",
                            borderRadius: "24px",
                            overflow: "hidden",
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "#111",
                            flexShrink: 0,
                          }}
                        >
                          <div
                            style={{
                              height: "24px",
                              background: "#111",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "60px",
                                height: "6px",
                                borderRadius: "3px",
                                background: "rgba(255,255,255,0.12)",
                              }}
                            />
                          </div>
                          <img
                            src={src}
                            alt={`${project.name} screenshot ${(i % project.screenshots.length) + 1}`}
                            style={{
                              width: "100%",
                              height: "auto",
                              display: "block",
                              objectFit: "cover",
                            }}
                            loading="lazy"
                          />
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {project.screenshots.map((src, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.97 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      style={{
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "8px",
                      }}
                    >
                      <img
                        src={src}
                        alt={`${project.name} screenshot ${i + 1}`}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                          display: "block",
                        }}
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </RevealBlock>
        )}

        {/* Footer CTA */}
        <RevealBlock delay={0.5}>
          <div
            style={{
              maxWidth: "1400px",
              margin: "40px auto 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "32px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <Link
              to="/"
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
              }
            >
              ← All projects
            </Link>
            <Link
              to="/#contact"
              style={{
                padding: "10px 24px",
                background: "#E8001A",
                color: "white",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "0.05em",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#c70016")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#E8001A")
              }
            >
              Work with Ravi →
            </Link>
          </div>
        </RevealBlock>
      </div>
    </div>
  );
}
