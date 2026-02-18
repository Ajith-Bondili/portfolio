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
  onSetView: (view: "github" | "leetcode") => void;
  onClick: () => void;
  onExpand: () => void;
  onClose?: () => void;
}

function formatNumber(value: number | undefined) {
  const safe = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat("en-US").format(safe || 0);
}

function formatDayCount(value: number | undefined) {
  const safe = Number.isFinite(value) ? Math.max(0, Math.round(value || 0)) : 0;
  return `${safe}d`;
}

interface MetricChipProps {
  label: string;
  value: string;
  tone?: "default" | "accent";
}

function MetricChip({ label, value, tone = "default" }: MetricChipProps) {
  return (
    <article className={`metric-chip ${tone === "accent" ? "metric-chip-accent" : ""}`}>
      <p className="metric-chip-label">{label}</p>
      <p className="metric-chip-value">{value}</p>
    </article>
  );
}

export default function CodingWindow({
  selected,
  expanded,
  isDark,
  className,
  view,
  githubData,
  leetCodeData,
  onSetView,
  onClick,
  onExpand,
  onClose,
}: CodingWindowProps) {
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
        </div>

        {view === "github" ? (
          githubData ? (
            <div className="coding-content">
              <div className="metric-chip-grid">
                <MetricChip
                  label="year total"
                  value={formatNumber(githubData.totalContributions)}
                />
                <MetricChip
                  label="active days"
                  value={formatNumber(githubData.activeDays)}
                  tone="accent"
                />
                <MetricChip
                  label="best streak"
                  value={formatDayCount(githubData.longestStreak)}
                />
              </div>
              <GitHubHeatmap days={githubData.days} compact={!expanded} weeks={expanded ? 52 : 12} />
            </div>
          ) : (
            <p className="muted-text">fetching github activity...</p>
          )
        ) : leetCodeData ? (
          <div className="coding-content">
            <div className="metric-chip-grid metric-chip-grid-single">
              <MetricChip label="solved" value={formatNumber(leetCodeData.totalSolved)} />
            </div>
            <div className="difficulty-row">
              <article className="difficulty-chip difficulty-easy">
                <span>easy</span>
                <strong>{formatNumber(leetCodeData.easySolved)}</strong>
              </article>
              <article className="difficulty-chip difficulty-medium">
                <span>medium</span>
                <strong>{formatNumber(leetCodeData.mediumSolved)}</strong>
              </article>
              <article className="difficulty-chip difficulty-hard">
                <span>hard</span>
                <strong>{formatNumber(leetCodeData.hardSolved)}</strong>
              </article>
            </div>
            <LeetCodeCalendar
              submissionCalendar={leetCodeData.submissionCalendar}
              viewMode={expanded ? "month" : "strip"}
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
