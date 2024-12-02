import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

export function SpeedLineChart() {
  const [chartData, setChartData] = useState<
    { timestamp: string; time: number; [key: string]: number | string }[]
  >([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/data/");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Dynamically build chart configuration
      const newConfig: ChartConfig = {};
      const newChartData = data.agvs_array_data.map(
        (agv: { time_stamp: string; car_id: number; agv_speed: number }) => {
          const key = `agv${agv.car_id}`;
          if (!newConfig[key]) {
            newConfig[key] = {
              label: `AGV ${agv.car_id}`,
              color: `hsl(var(--chart-${agv.car_id % 12}))`, // Cycle colors for multiple AGVs
            };
          }
          return {
            timestamp: new Date(agv.time_stamp).toLocaleTimeString(),
            time: new Date(agv.time_stamp).getTime(),
            [key]: agv.agv_speed,
          };
        },
      );

      setChartConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));

      setChartData((prevData) => {
        const mergedData = [...prevData];
        newChartData.forEach(
          (newDataPoint: {
            timestamp: string;
            time: number;
            [key: string]: number | string;
          }) => {
            const existingDataPoint = mergedData.find(
              (dataPoint) => dataPoint.timestamp === newDataPoint.timestamp,
            );
            if (existingDataPoint) {
              Object.assign(existingDataPoint, newDataPoint);
            } else {
              mergedData.push(newDataPoint);
            }
          },
        );

        const now = Date.now();
        const filteredData = mergedData.filter(
          (dataPoint) => now - dataPoint.time <= 5000,
        );

        return filteredData;
      });
    };

    return () => {
      ws.close();
    };
  }, []);

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
            {Object.keys(chartConfig).map((key) => (
              <Line
                key={key}
                dataKey={key}
                type="monotone"
                stroke={chartConfig[key].color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
