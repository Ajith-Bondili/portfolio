import WindowShell from "./WindowShell";

interface LinkItem {
  name: string;
  url: string;
}

interface ProjectItem {
  title: string;
  date: string;
  description: string;
  image?: string;
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
  const activeProject = projects[activeIndex];

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
        <div className="list-preview">
          {projects.map((project, index) => (
            <button
              type="button"
              key={project.title}
              onClick={() => {
                onSelectIndex(index);
                onOpenItem?.(index);
              }}
              className={`list-row ${index === activeIndex ? "list-row-active" : ""}`}
            >
              <span>{project.title}</span>
              <span className="muted-text">{project.date}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="split-layout">
          <aside className="split-list" aria-label="Projects list">
            {projects.map((project, index) => (
              <button
                type="button"
                key={project.title}
                onClick={() => onSelectIndex(index)}
                className={`split-list-item ${index === activeIndex ? "split-list-item-active" : ""}`}
              >
                <span>{project.title}</span>
                <span className="muted-text">{project.date}</span>
              </button>
            ))}
          </aside>

          <article className="split-detail">
            <h3>{activeProject.title}</h3>
            <p className="muted-text">{activeProject.date}</p>
            {activeProject.image && (
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="detail-image"
              />
            )}
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
