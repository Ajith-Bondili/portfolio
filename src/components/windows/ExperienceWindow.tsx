import WindowShell from "./WindowShell";

interface LinkItem {
  name: string;
  url: string;
}

interface ExperienceItem {
  title: string;
  date: string;
  description: string;
  image?: string;
  links: LinkItem[];
}

interface ExperienceWindowProps {
  selected: boolean;
  expanded: boolean;
  className?: string;
  experiences: ExperienceItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenItem?: (index: number) => void;
  onClick: () => void;
  onExpand: () => void;
  onClose?: () => void;
}

export default function ExperienceWindow({
  selected,
  expanded,
  className,
  experiences,
  activeIndex,
  onSelectIndex,
  onOpenItem,
  onClick,
  onExpand,
  onClose,
}: ExperienceWindowProps) {
  const activeExperience = experiences[activeIndex];

  return (
    <WindowShell
      title="experience"
      selected={selected}
      onClick={onClick}
      onExpand={!expanded ? onExpand : undefined}
      onClose={expanded ? onClose : undefined}
      className={className}
      bodyClassName={expanded ? "expanded-body" : ""}
    >
      {!expanded ? (
        <div className="list-preview">
          <div className="list-preview-meta">
            <p className="list-preview-label">experience</p>
            <span className="list-count-badge">{experiences.length} total</span>
          </div>

          <div className="list-scroll-wrap">
            <div className="list-scroll" aria-label="Experience list">
              {experiences.map((experience, index) => (
                <button
                  type="button"
                  key={experience.title}
                  onClick={() => {
                    onSelectIndex(index);
                    onOpenItem?.(index);
                  }}
                  className={`list-row ${index === activeIndex ? "list-row-active" : ""}`}
                >
                  <span
                    className={`row-marker ${index === activeIndex ? "row-marker-active" : ""}`}
                    aria-hidden="true"
                  >
                    {index === activeIndex ? ">" : " "}
                  </span>
                  <span className="row-main">{experience.title}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="list-overflow-hint muted-text">scroll for more</p>
        </div>
      ) : (
        <div className="split-layout">
          <aside className="split-list" aria-label="Experience list">
            {experiences.map((experience, index) => (
              <button
                type="button"
                key={experience.title}
                onClick={() => onSelectIndex(index)}
                className={`split-list-item ${index === activeIndex ? "split-list-item-active" : ""}`}
              >
                <span
                  className={`row-marker ${index === activeIndex ? "row-marker-active" : ""}`}
                  aria-hidden="true"
                >
                  {index === activeIndex ? ">" : " "}
                </span>
                <span className="row-main">{experience.title}</span>
              </button>
            ))}
          </aside>

          <article className="split-detail">
            <h3>{activeExperience.title}</h3>
            {activeExperience.image && (
              <img
                src={activeExperience.image}
                alt={activeExperience.title}
                className="detail-image"
              />
            )}
            <p>{activeExperience.description}</p>
            {activeExperience.links.length > 0 && (
              <div className="link-row">
                {activeExperience.links.map((link) => (
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
