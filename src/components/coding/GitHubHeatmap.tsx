import type { GitHubContributionDay } from "../../types/indexs";
import type { CSSProperties } from "react";

interface GitHubHeatmapProps {
  days: GitHubContributionDay[];
  compact?: boolean;
  weeks?: number;
}

type HeatmapCell = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

function toUtcDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatDateLabel(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function buildHeatmap(days: GitHubContributionDay[], weeks: number) {
  if (days.length === 0 || weeks <= 0) {
    return {
      cells: [] as HeatmapCell[],
      rangeLabel: "",
    };
  }

  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const dayMap = new Map(sorted.map((day) => [day.date, day]));

  const latestDate = toUtcDate(sorted[sorted.length - 1].date);
  const rangeEnd = new Date(latestDate);
  rangeEnd.setUTCDate(latestDate.getUTCDate() + (6 - latestDate.getUTCDay()));

  const rangeStart = new Date(rangeEnd);
  rangeStart.setUTCDate(rangeEnd.getUTCDate() - (weeks * 7 - 1));

  const cells: HeatmapCell[] = [];
  for (let week = 0; week < weeks; week += 1) {
    for (let day = 0; day < 7; day += 1) {
      const current = new Date(rangeStart);
      current.setUTCDate(rangeStart.getUTCDate() + week * 7 + day);
      const key = toDateKey(current);
      const existing = dayMap.get(key);
      cells.push(existing || { date: key, count: 0, level: 0 });
    }
  }

  const rangeLabel = `${formatDateLabel(rangeStart)} - ${formatDateLabel(latestDate)}`;

  return { cells, rangeLabel };
}

export default function GitHubHeatmap({
  days,
  compact = false,
  weeks = compact ? 12 : 52,
}: GitHubHeatmapProps) {
  const { cells, rangeLabel } = buildHeatmap(days, weeks);

  if (cells.length === 0) {
    return <p className="muted-text">no contribution data available yet.</p>;
  }

  const heatmapStyles = {
    "--heatmap-weeks": weeks,
  } as CSSProperties;

  return (
    <div className={`github-heatmap-wrap ${compact ? "github-heatmap-compact" : ""}`}>
      <div className="github-heatmap-topline">
        <span>last {weeks} weeks</span>
        <span>{rangeLabel}</span>
      </div>
      <div className="github-heatmap-grid" style={heatmapStyles}>
        {cells.map((cell, index) => {
          return (
            <span
              key={`${cell.date}-${index}`}
              className={`github-cell heat-level-${cell.level}`}
              title={`${cell.count} contributions on ${cell.date}`}
              aria-label={`${cell.count} contributions on ${cell.date}`}
            />
          );
        })}
      </div>
    </div>
  );
}
