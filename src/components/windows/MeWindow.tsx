import WindowShell from "./WindowShell";
import { EffectScene } from "../effects/effect-scene";

interface SchoolInfo {
  name: string;
  program: string;
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
  timeLabel: string;
  personalInfo: PersonalInfoModel;
  visitorGreeting?: string;
  onClick: () => void;
  onExpand: () => void;
  onClose?: () => void;
}

export default function MeWindow({
  selected,
  expanded,
  className,
  timeLabel,
  personalInfo,
  visitorGreeting,
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
          <EffectScene />

          <div className="info-block">
            <p className="accent-line">
              {personalInfo.username}@{personalInfo.computerName}
            </p>
            <p>{personalInfo.email}</p>
            <p>{timeLabel}</p>
            {visitorGreeting !== undefined && (
              <p className="muted-text">
                {visitorGreeting
                  ? `connecting from ${visitorGreeting}`
                  : "connecting from somewhere on earth"}
              </p>
            )}

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
                </div>
              </div>
            )}
            <p style={{ fontSize: "0.55rem", opacity: 0.35, marginTop: "0.25rem" }}>
              psst... check the top bar for controls
            </p>
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
