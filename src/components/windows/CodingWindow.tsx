import type { GitHubActivityData, LeetCodeData } from "../../types/indexs";
import LeetCodeCalendar from "../LeetCodeCalendar";
import GitHubHeatmap from "../coding/GitHubHeatmap";
import WindowShell from "./WindowShell";

interface CodingWindowProps {
  selected: boolean;
  expanded: boolean;
  isDark: boolean;
  className?: string;
  view: "github" | "leetcode";
  githubData: GitHubActivityData | null;
  leetCodeData: LeetCodeData | null;
  githubStatus: "loading" | "live" | "cached" | "degraded";
  leetcodeStatus: "loading" | "live" | "cached" | "degraded";
  onSetView: (view: "github" | "leetcode") => void;
  onClick: () => void;
  onExpand: () => void;
  onClose?: () => void;
}

export default function CodingWindow({
  selected,
  expanded,
  isDark,
  className,
  view,
  githubData,
  leetCodeData,
  githubStatus,
  leetcodeStatus,
  onSetView,
  onClick,
  onExpand,
  onClose,
}: CodingWindowProps) {
  const status = view === "github" ? githubStatus : leetcodeStatus;

  return (
    <WindowShell
      title="coding"
      selected={selected}
      onClick={onClick}
      onExpand={!expanded ? onExpand : undefined}
      onClose={expanded ? onClose : undefined}
      className={className}
      bodyClassName={expanded ? "expanded-body" : ""}
    >
      <div className="coding-shell">
        <div className="toggle-row" role="tablist" aria-label="Coding panel views">
          <button
            type="button"
            role="tab"
            aria-selected={view === "github"}
            className={`toggle-pill ${view === "github" ? "toggle-pill-active" : ""}`}
            onClick={() => onSetView("github")}
          >
            github
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "leetcode"}
            className={`toggle-pill ${view === "leetcode" ? "toggle-pill-active" : ""}`}
            onClick={() => onSetView("leetcode")}
          >
            leetcode
          </button>
          <span className={`status-pill status-${status}`}>{status}</span>
        </div>

        {view === "github" ? (
          githubData ? (
            <div className="coding-content">
              <div className="stats-row">
                <span>total: {githubData.totalContributions}</span>
                <span>streak: {githubData.currentStreak} days</span>
                <span>best: {githubData.longestStreak} days</span>
              </div>
              <GitHubHeatmap days={githubData.days} compact={!expanded} />
            </div>
          ) : (
            <p className="muted-text">fetching github activity...</p>
          )
        ) : leetCodeData ? (
          <div className="coding-content">
            <div className="stats-row">
              <span>total: {leetCodeData.totalSolved}</span>
              <span>easy: {leetCodeData.easySolved}</span>
              <span>medium: {leetCodeData.mediumSolved}</span>
              <span>hard: {leetCodeData.hardSolved}</span>
            </div>
            <LeetCodeCalendar
              submissionCalendar={leetCodeData.submissionCalendar}
              viewMode={expanded ? "month" : "week"}
              isDark={isDark}
            />
          </div>
        ) : (
          <p className="muted-text">fetching leetcode activity...</p>
        )}
      </div>
    </WindowShell>
  );
}
