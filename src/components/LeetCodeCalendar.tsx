import React from "react";
import Tooltip from "./Tooltip";

interface SubmissionCalendarProps {
  submissionCalendar: {
    [timestamp: string]: number;
  };
  viewMode?: "strip" | "month";
  isDark?: boolean;
}

const LeetCodeCalendar: React.FC<SubmissionCalendarProps> = ({
  submissionCalendar,
  viewMode = "strip",
  isDark = true,
}) => {
  const dayMap = new Map<string, number>();

  Object.entries(submissionCalendar).forEach(([timestamp, rawCount]) => {
    const parsedTimestamp = Number(timestamp);
    const parsedCount = Number(rawCount);
    if (!Number.isFinite(parsedTimestamp) || !Number.isFinite(parsedCount)) return;

    const key = new Date(parsedTimestamp * 1000).toISOString().slice(0, 10);
    dayMap.set(key, (dayMap.get(key) || 0) + parsedCount);
  });

  const getSubmissionCount = (date: Date) => {
    const key = date.toISOString().slice(0, 10);
    return dayMap.get(key) || 0;
  };

  const getMonthLevelClassName = (count: number) => {
    if (count <= 0) return "heat-level-0";
    if (count <= 2) return "heat-level-1";
    if (count <= 5) return "heat-level-2";
    if (count <= 10) return "heat-level-3";
    return "heat-level-4";
  };

  const getStripLevelClassName = (count: number) => {
    if (count <= 0) return "leetcode-level-0";
    if (count <= 2) return "leetcode-level-1";
    if (count <= 5) return "leetcode-level-2";
    if (count <= 10) return "leetcode-level-3";
    return "leetcode-level-4";
  };

  if (viewMode === "month") {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const year = today.getUTCFullYear();
    const month = today.getUTCMonth();

    const startDate = new Date(Date.UTC(year, month, 1));
    const endDate = new Date(Date.UTC(year, month + 1, 0));

    const daysInMonth: Date[] = [];
    const currentDate = new Date(startDate);
    while (currentDate.getTime() <= endDate.getTime()) {
      daysInMonth.push(new Date(currentDate));
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    const firstDayOfMonth = startDate.getUTCDay();
    const monthName = today.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    return (
      <div className={`leetcode-month-shell ${isDark ? "is-dark" : "is-light"}`}>
        <p className="leetcode-month-title">
          {monthName.toLowerCase()} {year}
        </p>
        <div className="leetcode-month-weekdays" aria-hidden="true">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="leetcode-month-grid">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <span key={`empty-${index}`} className="leetcode-month-empty" />
          ))}
          {daysInMonth.map((day, index) => {
            const count = getSubmissionCount(day);
            const label = day.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            });
            return (
              <Tooltip
                key={index}
                text={`${count} submissions on ${label}`}
              >
                <span className={`leetcode-month-cell ${getMonthLevelClassName(count)}`}>
                  <span>{day.getUTCDate()}</span>
                </span>
              </Tooltip>
            );
          })}
        </div>
      </div>
    );
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const daysInStrip: Date[] = [];

  for (let i = 13; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - i);
    daysInStrip.push(date);
  }

  return (
    <div className={`leetcode-strip-shell ${isDark ? "is-dark" : "is-light"}`}>
      <p className="leetcode-strip-title">14-day submissions</p>
      <div className="leetcode-strip-grid">
        {daysInStrip.map((day, index) => {
          const count = getSubmissionCount(day);
          const weekday = ["S", "M", "T", "W", "T", "F", "S"][day.getUTCDay()];
          const label = day.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            timeZone: "UTC",
          });

          return (
            <Tooltip
              key={index}
              text={`${count} submissions on ${label}`}
            >
              <span className={`leetcode-strip-cell ${getStripLevelClassName(count)}`}>
                <span className="leetcode-strip-weekday">{weekday}</span>
                <span className="leetcode-strip-day">{day.getUTCDate()}</span>
              </span>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default LeetCodeCalendar;
