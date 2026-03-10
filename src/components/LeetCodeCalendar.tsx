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
  const toLocalDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const dayMap = new Map<string, number>();

  Object.entries(submissionCalendar).forEach(([timestamp, rawCount]) => {
    const parsedTimestamp = Number(timestamp);
    const parsedCount = Number(rawCount);
    if (!Number.isFinite(parsedTimestamp) || !Number.isFinite(parsedCount)) return;

    const key = toLocalDateKey(new Date(parsedTimestamp * 1000));
    dayMap.set(key, (dayMap.get(key) || 0) + parsedCount);
  });

  const getSubmissionCount = (date: Date) => {
    const key = toLocalDateKey(date);
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
    today.setHours(0, 0, 0, 0);
    const year = today.getFullYear();
    const month = today.getMonth();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    const daysInMonth: Date[] = [];
    const currentDate = new Date(startDate);
    while (currentDate.getTime() <= endDate.getTime()) {
      daysInMonth.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const firstDayOfMonth = startDate.getDay();
    const monthName = today.toLocaleString("en-US", { month: "long" });
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
            });
            return (
              <Tooltip
                key={index}
                text={`${count} submissions on ${label}`}
              >
                <span className={`leetcode-month-cell ${getMonthLevelClassName(count)}`}>
                  <span>{day.getDate()}</span>
                </span>
              </Tooltip>
            );
          })}
        </div>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysInStrip: Date[] = [];

  for (let i = 13; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    daysInStrip.push(date);
  }

  return (
    <div className={`leetcode-strip-shell ${isDark ? "is-dark" : "is-light"}`}>
      <p className="leetcode-strip-title">14-day submissions</p>
      <div className="leetcode-strip-grid">
        {daysInStrip.map((day, index) => {
          const count = getSubmissionCount(day);
          const weekday = ["S", "M", "T", "W", "T", "F", "S"][day.getDay()];
          const label = day.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

          return (
            <Tooltip
              key={index}
              text={`${count} submissions on ${label}`}
            >
              <span className={`leetcode-strip-cell ${getStripLevelClassName(count)}`}>
                <span className="leetcode-strip-weekday">{weekday}</span>
                <span className="leetcode-strip-day">{day.getDate()}</span>
              </span>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default LeetCodeCalendar;
