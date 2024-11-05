"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple line chart";

const chartData = [
  { timestamp: "16:00:00", agv1: 186, agv2: 80 },
  { timestamp: "16:00:02", agv1: 305, agv2: 200 },
  { timestamp: "16:00:04", agv1: 237, agv2: 120 },
  { timestamp: "16:00:06", agv1: 73, agv2: 190 },
  { timestamp: "16:00:08", agv1: 209, agv2: 130 },
  { timestamp: "16:00:10", agv1: 214, agv2: 140 },
];

const chartConfig = {
  agv1: {
    label: "AGV 1",
    color: "hsl(var(--chart-1))",
  },
  agv2: {
    label: "AGV 2",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function LineChartDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Speed Line Chart - Multiple AGVs</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-72 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="agv1"
              type="monotone"
              stroke="var(--color-agv1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="agv2"
              type="monotone"
              stroke="var(--color-agv2)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
