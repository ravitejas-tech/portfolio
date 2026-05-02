import { Link } from "react-router";
import type { Project } from "~/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function getStatusClass(status: Project["status"]): string {
  if (status === "live") return "status-badge status-live";
  if (status === "ongoing") return "status-badge status-wip";
  return "status-badge status-archived";
}

function getStatusLabel(status: Project["status"]): string {
  if (status === "live") return "● Live";
  if (status === "ongoing") return "◐ Ongoing";
  return "○ Archived";
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="project-card-new">
      {/* Screenshot area */}
      <div className="card-screenshot">
        {/* Project number watermark */}
        <span
          style={{
            position: "absolute",
            top: "16px",
            left: "20px",
            fontSize: "11px",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.2em",
            zIndex: 2,
            fontWeight: 600,
          }}
        >
          {num}
        </span>
        {project.screenshots[0] ? (
          <img src={project.screenshots[0]} alt={project.name} />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.06)",
                fontFamily: "monospace",
                fontSize: "40px",
                fontWeight: 700,
              }}
            >
              {"{ }"}
            </span>
          </div>
        )}
        {/* Status badge — top right */}
        <span
          className={getStatusClass(project.status)}
          style={{ position: "absolute", top: "12px", right: "12px" }}
        >
          {getStatusLabel(project.status)}
        </span>
      </div>

      {/* Card body */}
      <div className="card-body">
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.3,
            marginBottom: "6px",
          }}
        >
          {project.name}
        </h3>

        <p
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.55,
            marginBottom: "14px",
          }}
        >
          {project.tagline}
        </p>

        {/* Tech tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            marginBottom: "16px",
          }}
        >
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              style={{
                padding: "2px 8px",
                fontSize: "10px",
                color: "rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.09)",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span
              style={{
                padding: "2px 6px",
                fontSize: "10px",
                color: "rgba(255,255,255,0.18)",
              }}
            >
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* CTA — hidden until hover via CSS */}
        <Link
          to={`/projects/${project.id}`}
          className="card-cta"
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          View case study →
        </Link>
      </div>
    </div>
  );
}
