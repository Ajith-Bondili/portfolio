import WindowShell from "./WindowShell";

interface LinkItem {
  name: string;
  url: string;
}

interface ProjectItem {
  title: string;
  hackathon?: string;
  hackathonWon?: boolean;
  stats?: string;
  date: string;
  meta?: string;
  stack?: string[];
  description: string;
  image?: string;
  video?: string;
  links: LinkItem[];
}

interface ProjectsWindowProps {
  selected: boolean;
  expanded: boolean;
  className?: string;
  projects: ProjectItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenItem?: (index: number) => void;
  onClick: () => void;
  onExpand: () => void;
  onClose?: () => void;
}

export default function ProjectsWindow({
  selected,
  expanded,
  className,
  projects,
  activeIndex,
  onSelectIndex,
  onOpenItem,
  onClick,
  onExpand,
  onClose,
}: ProjectsWindowProps) {
  const renderMedia = (src: string | undefined, videoSrc: string | undefined, alt: string, cls: string) => {
    if (videoSrc) return (
      <video autoPlay muted loop playsInline controls className={cls}>
        <source src={videoSrc} type="video/mp4" />
      </video>
    );
    if (src) return <img src={src} alt={alt} className={cls} />;
    return null;
  };

  const activeProject = projects[activeIndex];
  const activeProjectMeta = activeProject.meta;
  const activeProjectSummary = activeProject.description
    .replace(/\s+/g, " ")
    .trim()
    .split(". ")[0];
  const activeProjectLinks = activeProject.links.slice(0, 2);

  return (
    <WindowShell
      title="projects"
      selected={selected}
      onClick={onClick}
      onExpand={!expanded ? onExpand : undefined}
      onClose={expanded ? onClose : undefined}
      className={className}
      bodyClassName={expanded ? "expanded-body" : ""}
    >
      {!expanded ? (
        <div className="list-preview projects-compact-preview">
          <div className="list-preview-meta">
            <p className="list-preview-label">projects</p>
            <span className="list-count-badge">{projects.length} total</span>
          </div>

          <div className="list-scroll-wrap">
            <div className="list-scroll" aria-label="Projects list">
              {projects.map((project, index) => {
                const hasMeta = Boolean(project.meta);

                return (
                  <button
                    type="button"
                    key={project.title}
                    onClick={() => {
                      onSelectIndex(index);
                      onOpenItem?.(index);
                    }}
                    className={`list-row ${hasMeta ? "list-row-has-meta" : ""} ${index === activeIndex ? "list-row-active" : ""}`}
                  >
                    <span
                      className={`row-marker ${index === activeIndex ? "row-marker-active" : ""}`}
                      aria-hidden="true"
                    >
                      {index === activeIndex ? ">" : " "}
                    </span>
                    <span className="row-main">
                      {project.title}
                      {project.hackathon ? (
                        <span className="hackathon-pill">[{project.hackathonWon ? "🏆 " : ""}{project.hackathon}]</span>
                      ) : null}
                    </span>
                    {hasMeta ? <span className="row-meta muted-text">{project.meta}</span> : null}
                  </button>
                );
              })}
            </div>
          </div>

          <article className="project-focus-card" aria-label="Selected project preview">
            <p className="project-focus-label">selected project</p>
            <h3 className="project-focus-title">
              {activeProject.title}
              {activeProject.hackathon ? (
                <span className="hackathon-pill">[{activeProject.hackathonWon ? "🏆 " : ""}{activeProject.hackathon}]</span>
              ) : null}
            </h3>
            {activeProject.stats ? (
              <p className="project-stats">{activeProject.stats}</p>
            ) : null}
            {activeProjectMeta ? (
              <p className="project-focus-meta muted-text">{activeProjectMeta}</p>
            ) : null}
            {activeProject.stack && activeProject.stack.length > 0 ? (
              <div className="project-focus-stack" aria-label="Project stack">
                {activeProject.stack.map((stackItem) => (
                  <span key={stackItem} className="project-stack-pill">
                    {stackItem}
                  </span>
                ))}
              </div>
            ) : null}
            <p className="project-focus-summary">{activeProjectSummary}</p>
            {activeProjectLinks.length > 0 ? (
              <div className="link-row">
                {activeProjectLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="minimal-link"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            ) : null}
          </article>
        </div>
      ) : (
        <div className="split-layout">
          <aside className="split-list" aria-label="Projects list">
            {projects.map((project, index) => {
              const hasMeta = Boolean(project.meta);

              return (
                <button
                  type="button"
                  key={project.title}
                  onClick={() => onSelectIndex(index)}
                  className={`split-list-item ${hasMeta ? "split-list-item-has-meta" : ""} ${index === activeIndex ? "split-list-item-active" : ""}`}
                >
                  <span
                    className={`row-marker ${index === activeIndex ? "row-marker-active" : ""}`}
                    aria-hidden="true"
                  >
                    {index === activeIndex ? ">" : " "}
                  </span>
                  <span className="row-main">
                    {project.title}
                    {project.hackathon ? (
                      <span className="hackathon-pill">[{project.hackathonWon ? "🏆 " : ""}{project.hackathon}]</span>
                    ) : null}
                  </span>
                  {hasMeta ? <span className="row-meta muted-text">{project.meta}</span> : null}
                </button>
              );
            })}
          </aside>

          <article className="split-detail">
            <h3>
              {activeProject.title}
              {activeProject.hackathon ? (
                <span className="hackathon-pill">[{activeProject.hackathonWon ? "🏆 " : ""}{activeProject.hackathon}]</span>
              ) : null}
            </h3>
            {activeProject.stats ? (
              <p className="project-stats">{activeProject.stats}</p>
            ) : null}
            {activeProjectMeta ? <p className="muted-text">{activeProjectMeta}</p> : null}
            {renderMedia(activeProject.image, activeProject.video, activeProject.title, "project-media-full")}
            <p>{activeProject.description}</p>
            {activeProject.links.length > 0 && (
              <div className="link-row">
                {activeProject.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="minimal-link"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </article>
        </div>
      )}
    </WindowShell>
  );
}
