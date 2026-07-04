/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  HeatmapCells,
  HeatmapChart,
  HeatmapChartLoading,
  HeatmapInteractionBoundary,
  HeatmapInteractionProvider,
  HeatmapLegend,
  HeatmapTooltip,
  HeatmapXAxis,
  HeatmapYAxis,
  type HeatmapColumn,
  type HeatmapLevelStyles,
} from "@/components/charts/heatmap";

const GITHUB_USERNAME = "MarkLyck";
const CONTRIBUTIONS_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`;
const DAY_MS = 24 * 60 * 60 * 1000;

type Activity = {
  date: string;
  count: number;
  level?: number;
};

type ContributionsResponse = {
  total: Record<string, number>;
  contributions: Activity[];
};

type LoadStatus = "loading" | "ready" | "error";
type ChartStatus = "loading" | "ready";

const CHART_ASPECT_RATIO = "6.2 / 1";
const CHART_MARGIN = { top: 28, right: 16, bottom: 16, left: 32 };

const levelStyles = [
  { color: "#161b22", fillMode: "solid" },
  { color: "#0e4429", fillMode: "solid" },
  { color: "#006d32", fillMode: "solid" },
  { color: "#26a641", fillMode: "solid" },
  { color: "#39d353", fillMode: "solid" },
] as const satisfies HeatmapLevelStyles;

const contributionFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const parseDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const startOfSundayWeek = (date: Date) => addDays(date, -date.getDay());

const sortYears = (total: Record<string, number>) =>
  Object.keys(total)
    .map((year) => Number(year))
    .filter((year) => Number.isInteger(year))
    .sort((a, b) => b - a);

const getSelectedRange = (year: number) => {
  const currentYear = new Date().getFullYear();
  const end = year === currentYear ? new Date() : new Date(year, 11, 31);
  const start = year === currentYear ? addDays(end, -364) : new Date(year, 0, 1);

  return {
    start: new Date(start.getFullYear(), start.getMonth(), start.getDate()),
    end: new Date(end.getFullYear(), end.getMonth(), end.getDate()),
  };
};

const buildHeatmapColumns = (activities: Activity[], year: number): HeatmapColumn[] => {
  const { start, end } = getSelectedRange(year);
  const activitiesByDate = new Map(activities.map((activity) => [activity.date, activity]));
  const columns: HeatmapColumn[] = [];
  let columnStart = startOfSundayWeek(start);
  let columnIndex = 0;

  while (columnStart <= end) {
    columns.push({
      bin: columnIndex,
      bins: Array.from({ length: 7 }, (_, dayIndex) => {
        const date = addDays(columnStart, dayIndex);
        const key = formatDateKey(date);
        const activity = date >= start && date <= end ? activitiesByDate.get(key) : undefined;

        return {
          bin: dayIndex,
          count: activity?.count ?? 0,
          level: activity?.level ?? 0,
          date,
        };
      }),
    });

    columnStart = addDays(columnStart, 7);
    columnIndex += 1;
  }

  return columns;
};

const getActivitiesForYear = (activities: Activity[], year: number) => {
  const { start, end } = getSelectedRange(year);

  return activities.filter((activity) => {
    const date = parseDate(activity.date);
    return date >= start && date <= end;
  });
};

const formatContributionLabel = (count: number, date: Date) => {
  const label = count === 1 ? "1 contribution" : `${count.toLocaleString()} contributions`;
  return `${label} on ${contributionFormatter.format(date)}`;
};

const ErrorState = () => (
  <div className="flex min-h-[15rem] items-center justify-center rounded-lg border border-red-500/20 bg-zinc-950/30 px-6 text-center text-sm text-red-200">
    Could not load GitHub contributions right now.
  </div>
);

const ContributionChartShell = ({ children }: { children: ReactNode }) => (
  <div className="overflow-x-auto rounded-lg bg-zinc-950/35 px-4 pb-7 pt-5">
    <div className="min-w-[760px]">{children}</div>
  </div>
);

const ContributionChartLegend = ({ hidden = false }: { hidden?: boolean }) => (
  <div aria-hidden={hidden}>
    <HeatmapLegend
      align="center"
      cellSize={13}
      className={["justify-center pt-3", hidden ? "invisible" : ""].join(" ")}
      cornerRadius={3}
      gap={4}
      labelClassName="font-semibold text-zinc-400"
      levelStyles={levelStyles}
    />
  </div>
);

const ContributionChartLoading = ({ data }: { data: HeatmapColumn[] }) => (
  <>
    <ContributionChartShell>
      <HeatmapChartLoading
        className="[aspect-ratio:6.2/1]"
        cornerRadius={3}
        data={data}
        gap={3}
        label="Loading contributions"
        margin={CHART_MARGIN}
      />
    </ContributionChartShell>
    <ContributionChartLegend hidden />
  </>
);

const CheckIcon = () => (
  <svg
    aria-hidden="true"
    className="size-3.5 text-emerald-400"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      d="m20 6-11 11-5-5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
    />
  </svg>
);

const ChevronDownIcon = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden="true"
    className={[
      "size-3.5 text-zinc-400 transition-transform duration-150",
      open ? "rotate-180" : "",
    ].join(" ")}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      d="m6 9 6 6 6-6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

type YearSelectProps = {
  disabled?: boolean;
  onChange: (year: number) => void;
  value: number;
  years: number[];
};

const YearSelect = ({ disabled = false, onChange, value, years }: YearSelectProps) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => Math.max(years.indexOf(value), 0));
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedIndex = Math.max(years.indexOf(value), 0);

  useEffect(() => {
    setActiveIndex(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const selectYear = (year: number) => {
    setOpen(false);
    if (year !== value) {
      onChange(year);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => {
        const delta = event.key === "ArrowDown" ? 1 : -1;
        return (index + delta + years.length) % years.length;
      });
      return;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(event.key === "Home" ? 0 : years.length - 1);
      return;
    }

    if ((event.key === "Enter" || event.key === " ") && open) {
      event.preventDefault();
      selectYear(years[activeIndex] ?? value);
    }
  };

  return (
    <div className="relative w-[6.5rem]" ref={rootRef}>
      <button
        aria-controls="github-contribution-year-listbox"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="inline-flex h-10 w-full items-center justify-between gap-3 rounded-md border border-border bg-card px-3 text-sm font-semibold text-foreground shadow-sm outline-none transition-colors hover:border-zinc-600 focus-visible:border-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-600/40 disabled:cursor-wait disabled:opacity-70"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
        type="button"
      >
        <span>{value}</span>
        <ChevronDownIcon open={open} />
      </button>
      {open ? (
        <div className="absolute right-0 top-12 z-50 w-full overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/95 p-1.5 shadow-2xl shadow-black/40 backdrop-blur">
          <div
            aria-activedescendant={`github-contribution-year-${years[activeIndex] ?? value}`}
            aria-label="Select contribution year"
            className="scroll-fade-y no-scrollbar max-h-56 overflow-y-auto overscroll-contain pr-0.5 outline-none scroll-fade-8 [--scroll-fade-reveal:48px]"
            id="github-contribution-year-listbox"
            role="listbox"
          >
            {years.map((year, index) => {
              const selected = year === value;
              const active = index === activeIndex;

              return (
                <button
                  aria-selected={selected}
                  className={[
                    "flex h-9 w-full items-center justify-between gap-3 rounded-md px-3 text-left text-sm transition-colors",
                    selected ? "text-white" : "text-zinc-300",
                    active ? "bg-zinc-800/90" : "hover:bg-zinc-900",
                  ].join(" ")}
                  id={`github-contribution-year-${year}`}
                  key={year}
                  onClick={() => selectYear(year)}
                  onMouseEnter={() => setActiveIndex(index)}
                  role="option"
                  type="button"
                >
                  <span>{year}</span>
                  {selected ? <CheckIcon /> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

function GitHubContributionGraph() {
  const [response, setResponse] = useState<ContributionsResponse | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [chartStatus, setChartStatus] = useState<ChartStatus>("ready");
  const yearSwitchTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadContributions = async () => {
      try {
        const apiResponse = await fetch(CONTRIBUTIONS_URL, {
          signal: controller.signal,
        });

        if (!apiResponse.ok) {
          throw new Error(`Unexpected status: ${apiResponse.status}`);
        }

        const data = (await apiResponse.json()) as ContributionsResponse;
        const years = sortYears(data.total);
        const currentYear = new Date().getFullYear();

        setResponse(data);
        setSelectedYear(years.find((year) => year === currentYear) ?? years[0] ?? null);
        setChartStatus("ready");
        setStatus("ready");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Failed to load GitHub contributions", error);
        setStatus("error");
      }
    };

    void loadContributions();

    return () => {
      controller.abort();
      if (yearSwitchTimerRef.current !== null) {
        window.clearTimeout(yearSwitchTimerRef.current);
      }
    };
  }, []);

  const handleYearChange = (year: number) => {
    if (year === selectedYear || chartStatus === "loading") {
      return;
    }

    if (yearSwitchTimerRef.current !== null) {
      window.clearTimeout(yearSwitchTimerRef.current);
    }

    setSelectedYear(year);
    setChartStatus("loading");
    yearSwitchTimerRef.current = window.setTimeout(() => {
      setChartStatus("ready");
      yearSwitchTimerRef.current = null;
    }, 650);
  };

  const years = useMemo(() => (response ? sortYears(response.total) : []), [response]);
  const activeYear = selectedYear ?? years[0] ?? null;
  const selectedActivities = useMemo(
    () => (response && activeYear ? getActivitiesForYear(response.contributions, activeYear) : []),
    [activeYear, response]
  );
  const heatmapData = useMemo(
    () => (activeYear ? buildHeatmapColumns(selectedActivities, activeYear) : []),
    [activeYear, selectedActivities]
  );
  const selectedTotal = selectedActivities.reduce((total, activity) => total + activity.count, 0);
  const currentYear = new Date().getFullYear();
  const loadingHeatmapData = useMemo(() => buildHeatmapColumns([], currentYear), [currentYear]);
  const totalCountLabel =
    activeYear === currentYear
      ? `${selectedTotal.toLocaleString()} contributions in the last year`
      : `${selectedTotal.toLocaleString()} contributions in ${activeYear ?? ""}`;

  return (
    <div className="mx-auto flex w-full flex-col gap-5">
      {status === "loading" ? <ContributionChartLoading data={loadingHeatmapData} /> : null}
      {status === "error" ? <ErrorState /> : null}
      {status === "ready" && activeYear ? (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base font-semibold tracking-tight sm:text-lg">{totalCountLabel}</p>
            <div className="flex items-center gap-3 self-start text-sm text-secondary-foreground sm:self-auto">
              <span>Year</span>
              <YearSelect
                disabled={chartStatus === "loading"}
                onChange={handleYearChange}
                value={activeYear}
                years={years}
              />
            </div>
          </div>
          <HeatmapInteractionProvider>
            <HeatmapInteractionBoundary>
              {chartStatus === "loading" ? (
                <ContributionChartLoading data={heatmapData} />
              ) : (
                <>
                  <ContributionChartShell>
                    <HeatmapChart
                      animate
                      aspectRatio={CHART_ASPECT_RATIO}
                      data={heatmapData}
                      gap={4}
                      levelStyles={levelStyles}
                      margin={CHART_MARGIN}
                      revealSignature={String(activeYear)}
                    >
                      <HeatmapCells cornerRadius={3} />
                      <HeatmapXAxis className="font-semibold text-[13px] text-zinc-400" />
                      <HeatmapYAxis className="font-semibold text-[13px] text-zinc-400" />
                      <HeatmapTooltip formatLabel={formatContributionLabel} />
                    </HeatmapChart>
                  </ContributionChartShell>
                  <ContributionChartLegend />
                </>
              )}
            </HeatmapInteractionBoundary>
          </HeatmapInteractionProvider>
        </>
      ) : null}
    </div>
  );
}

export const QGitHubContributionGraph = qwikify$(GitHubContributionGraph);
