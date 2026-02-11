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
          {experiences.map((experience, index) => (
            <button
              type="button"
              key={experience.title}
              onClick={() => onSelectIndex(index)}
              className={`list-row ${index === activeIndex ? "list-row-active" : ""}`}
            >
              <span>{experience.title}</span>
              <span className="muted-text">{experience.date}</span>
            </button>
          ))}
          <p className="muted-hint">enter to expand</p>
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
                <span>{experience.title}</span>
                <span className="muted-text">{experience.date}</span>
              </button>
            ))}
          </aside>

          <article className="split-detail">
            <h3>{activeExperience.title}</h3>
            <p className="muted-text">{activeExperience.date}</p>
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
