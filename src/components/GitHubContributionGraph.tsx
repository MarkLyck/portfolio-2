import { format, parseISO, subDays } from "date-fns";
import {
  AlertCircle,
  Check,
  ChevronDown,
  LoaderCircle,
} from "lucide-react";
import { startTransition, useEffect, useMemo, useState } from "react";

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  type Activity,
} from "@/components/ui/contribution-graph";
import { Select } from "@base-ui/react/select";
import { cn } from "@/lib/utils";

const GITHUB_USERNAME = "marklyck";
const CONTRIBUTIONS_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`;

type ContributionsResponse = {
  total: Record<string, number>;
  contributions: Activity[];
};

const graphTheme = {
  0: "fill-[#161b22]",
  1: "fill-[#0e4429]",
  2: "fill-[#006d32]",
  3: "fill-[#26a641]",
  4: "fill-[#39d353]",
} as const;

const graphBlockClasses = cn(
  'data-[level="0"]:fill-[#161b22]',
  'data-[level="1"]:fill-[#0e4429]',
  'data-[level="2"]:fill-[#006d32]',
  'data-[level="3"]:fill-[#26a641]',
  'data-[level="4"]:fill-[#39d353]'
);

const sortYears = (total: Record<string, number>) =>
  Object.keys(total)
    .map((year) => Number(year))
    .filter((year) => Number.isInteger(year))
    .sort((a, b) => b - a);

const formatContributionLabel = (activity: Activity) => {
  const label =
    activity.count === 1
      ? "1 contribution"
      : `${activity.count.toLocaleString()} contributions`;

  return `${label} on ${format(parseISO(activity.date), "MMMM d, yyyy")}`;
};

const LoadingState = () => (
  <div className="flex min-h-[18rem] items-center justify-center rounded-lg border border-border bg-card/50">
    <div className="flex items-center gap-3 text-sm text-secondary-foreground">
      <LoaderCircle className="h-4 w-4 animate-spin text-emerald-400" />
      Loading contribution history...
    </div>
  </div>
);

const ErrorState = () => (
  <div className="flex min-h-[18rem] items-center justify-center rounded-lg border border-red-500/20 bg-card/50 px-6 text-center">
    <div className="max-w-md">
      <div className="mb-3 flex items-center justify-center gap-2 text-red-300">
        <AlertCircle className="h-4 w-4" />
        Could not load GitHub contributions right now.
      </div>
    </div>
  </div>
);

const GitHubContributionGraph = () => {
  const [response, setResponse] = useState<ContributionsResponse | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

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
        const defaultYear = years.find((year) => year === currentYear) ?? years[0];

        setResponse(data);
        startTransition(() => {
          setSelectedYear(defaultYear ?? null);
          setStatus("ready");
        });
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
    };
  }, []);

  const years = useMemo(
    () => (response ? sortYears(response.total) : []),
    [response]
  );
  const currentYear = new Date().getFullYear();
  const activeYear = selectedYear ?? years[0] ?? null;
  const isRollingLastYearView = activeYear === currentYear;
  const selectedData = useMemo(() => {
    if (!response || !activeYear) {
      return [];
    }

    if (activeYear === currentYear) {
      const endDate = format(new Date(), "yyyy-MM-dd");
      const startDate = format(subDays(new Date(), 364), "yyyy-MM-dd");

      return response.contributions.filter(
        (activity) => activity.date >= startDate && activity.date <= endDate
      );
    }

    return response.contributions.filter((activity) =>
      activity.date.startsWith(`${activeYear}-`)
    );
  }, [activeYear, currentYear, response]);
  const selectedTotal = selectedData.reduce(
    (total, activity) => total + activity.count,
    0
  );
  const totalCountLabel =
    activeYear === null
      ? ""
      : isRollingLastYearView
        ? `${selectedTotal.toLocaleString()} contributions in the last year`
        : `${selectedTotal.toLocaleString()} contributions in ${activeYear}`;

  return (
    <div className="mx-auto flex w-full flex-col gap-4 px-1 sm:px-2">
      {status === "loading" ? <LoadingState /> : null}
      {status === "error" ? <ErrorState /> : null}
      {status === "ready" && activeYear && selectedData.length > 0 ? (
        <div className="mx-auto flex w-full flex-col gap-4">
          <div className="flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-sm font-medium sm:text-base">
              {totalCountLabel}
            </p>
            <div className="flex items-center gap-2">
              <Select.Root
                value={activeYear}
                onValueChange={(value) => setSelectedYear(value as number)}
                modal={false}
              >
                <Select.Trigger
                  aria-label="Select contribution year"
                  className="flex h-10 w-[7.5rem] items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm text-white ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [&>span]:line-clamp-1"
                >
                  <Select.Value placeholder="Select year" />
                  <Select.Icon className="ml-2 shrink-0 opacity-50">
                    <ChevronDown className="h-4 w-4" />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Positioner side="bottom" align="start" sideOffset={4}>
                    <Select.Popup className="z-50 max-h-[10.5rem] min-w-[8rem] overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {years.map((year) => (
                        <Select.Item
                          key={year}
                          value={year}
                          className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-8 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
                        >
                          <Select.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                            <Check className="h-4 w-4" />
                          </Select.ItemIndicator>
                          <Select.ItemText>{year}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Popup>
                  </Select.Positioner>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>
          <div className="min-w-0">
            <ContributionGraph
              data={selectedData}
              totalCount={selectedTotal}
              blockMargin={4}
              blockRadius={2}
              blockSize={15}
              fontSize={14}
              className="w-full items-stretch"
            >
              <ContributionGraphCalendar className="w-full rounded-lg bg-card/20 px-2 py-2 sm:px-4 sm:py-4">
                {({ activity, dayIndex, weekIndex }) => (
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                    className={graphBlockClasses}
                  >
                    <title>{formatContributionLabel(activity)}</title>
                  </ContributionGraphBlock>
                )}
              </ContributionGraphCalendar>
              <ContributionGraphFooter className="w-full justify-center gap-4 pt-2 text-center">
                <ContributionGraphLegend className="ml-0 justify-center">
                  {({ level }) => (
                    <svg height={11} width={11}>
                      <rect
                        className={cn(
                          level === 0 && graphTheme[0],
                          level === 1 && graphTheme[1],
                          level === 2 && graphTheme[2],
                          level === 3 && graphTheme[3],
                          level === 4 && graphTheme[4]
                        )}
                        height={11}
                        rx={2}
                        ry={2}
                        width={11}
                      />
                    </svg>
                  )}
                </ContributionGraphLegend>
              </ContributionGraphFooter>
            </ContributionGraph>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GitHubContributionGraph;
