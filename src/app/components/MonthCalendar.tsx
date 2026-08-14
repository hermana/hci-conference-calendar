"use client";

import { useMemo, useState } from "react";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function MonthCalendar() {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weeks = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = firstOfMonth.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    while (days.length % 7 !== 0) days.push(null);

    const result: (Date | null)[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7));
    }
    return result;
  }, [viewDate]);

  const goToPreviousMonth = () =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goToNextMonth = () =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const goToToday = () =>
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));

  return (
    <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/15 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPreviousMonth}
          aria-label="Previous month"
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-black/[.06] dark:text-zinc-300 dark:hover:bg-white/[.08]"
        >
          &#8249;
        </button>
        <button
          type="button"
          onClick={goToToday}
          className="text-sm font-semibold text-zinc-950 hover:underline dark:text-zinc-50"
        >
          {monthLabel}
        </button>
        <button
          type="button"
          onClick={goToNextMonth}
          aria-label="Next month"
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-black/[.06] dark:text-zinc-300 dark:hover:bg-white/[.08]"
        >
          &#8250;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="py-1">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.map((week, weekIndex) =>
          week.map((date, dayIndex) => {
            const isToday = date !== null && isSameDay(date, today);
            return (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className="flex aspect-square items-center justify-center"
              >
                {date && (
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                      isToday
                        ? "bg-zinc-950 font-semibold text-white dark:bg-zinc-50 dark:text-black"
                        : "text-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    {date.getDate()}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
