import WindowShell from "./WindowShell";

interface SchoolInfo {
  name: string;
  program: string;
  startDate: string;
  logoDitherPath: string;
}

interface PersonalInfoModel {
  name: string;
  username: string;
  computerName: string;
  email: string;
  title: string;
  location: string;
  aboutMe: string[];
  school?: SchoolInfo;
}

interface MeWindowProps {
  selected: boolean;
  expanded: boolean;
  className?: string;
  asciiArt: string;
  timeLabel: string;
  personalInfo: PersonalInfoModel;
  onClick: () => void;
  onExpand: () => void;
  onClose?: () => void;
}

export default function MeWindow({
  selected,
  expanded,
  className,
  asciiArt,
  timeLabel,
  personalInfo,
  onClick,
  onExpand,
  onClose,
}: MeWindowProps) {
  const school = personalInfo.school;

  return (
    <WindowShell
      title="me"
      selected={selected}
      onClick={onClick}
      onExpand={!expanded ? onExpand : undefined}
      onClose={expanded ? onClose : undefined}
      className={className}
      bodyClassName={expanded ? "expanded-body" : ""}
    >
      {!expanded ? (
        <div className="me-compact-grid">
          <pre className="ascii-preview" aria-hidden>
            {asciiArt}
          </pre>

          <div className="info-block">
            <p className="accent-line">
              {personalInfo.username}@{personalInfo.computerName}
            </p>
            <p>{personalInfo.name}</p>
            <p>{personalInfo.email}</p>
            <p>{personalInfo.title}</p>
            <p>{personalInfo.location}</p>
            <p>{timeLabel}</p>

            {school && (
              <div className="school-card">
                <img
                  src={school.logoDitherPath}
                  alt={`${school.name} logo`}
                  className="school-logo"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <div>
                  <p className="school-name">{school.name}</p>
                  <p className="muted-text">{school.program}</p>
                  <p className="muted-text">started {school.startDate}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="about-shell">
          <div className="about-head">
            <p className="accent-line">
              {personalInfo.username}@{personalInfo.computerName}
            </p>
            <p className="muted-text">about me</p>
          </div>

          <div className="about-content">
            {personalInfo.aboutMe.map((paragraph, index) => (
              <p
                key={`${index}-${paragraph.slice(0, 24)}`}
                className="about-paragraph"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>
      )}
    </WindowShell>
  );
}
