import type { GitHubContributionDay } from "../../types/indexs";

interface GitHubHeatmapProps {
  days: GitHubContributionDay[];
  compact?: boolean;
}

function buildHeatmapCells(days: GitHubContributionDay[], compact: boolean) {
  if (days.length === 0) return [];

  const maxDays = compact ? 182 : 371;
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const dayMap = new Map(sorted.map((day) => [day.date, day]));

  const lastDate = new Date(`${sorted[sorted.length - 1].date}T00:00:00Z`);
  const firstDate = new Date(lastDate);
  firstDate.setUTCDate(lastDate.getUTCDate() - (maxDays - 1));

  const cells: (GitHubContributionDay | null)[] = [];
  const leadingPadding = firstDate.getUTCDay();

  for (let i = 0; i < leadingPadding; i += 1) {
    cells.push(null);
  }

  for (let i = 0; i < maxDays; i += 1) {
    const currentDate = new Date(firstDate);
    currentDate.setUTCDate(firstDate.getUTCDate() + i);
    const key = currentDate.toISOString().slice(0, 10);
    const day = dayMap.get(key);

    if (day) {
      cells.push(day);
    } else {
      cells.push({ date: key, count: 0, level: 0 });
    }
  }

  const trailingPadding = (7 - (cells.length % 7)) % 7;
  for (let i = 0; i < trailingPadding; i += 1) {
    cells.push(null);
  }

  return cells;
}

export default function GitHubHeatmap({ days, compact = false }: GitHubHeatmapProps) {
  const cells = buildHeatmapCells(days, compact);

  if (cells.length === 0) {
    return <p className="muted-text">no contribution data available yet.</p>;
  }

  return (
    <div className="github-heatmap-wrap">
      <div className="github-heatmap-grid">
        {cells.map((cell, index) => {
          if (!cell) {
            return <span key={`empty-${index}`} className="github-cell github-cell-empty" />;
          }

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
