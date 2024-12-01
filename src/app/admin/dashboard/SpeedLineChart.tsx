"use client";

// ! new code, display only most recent 5 seconds of data

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

export function SpeedLineChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/data/");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newChartData = data.agvs_array_data.map((agv) => ({
        timestamp: new Date(agv.time_stamp).toLocaleTimeString(),
        time: new Date(agv.time_stamp).getTime(),
        [`agv${agv.car_id}`]: agv.agv_speed,
      }));

      setChartData((prevData) => {
        const mergedData = [...prevData];
        newChartData.forEach((newDataPoint) => {
          const existingDataPoint = mergedData.find(
            (dataPoint) => dataPoint.timestamp === newDataPoint.timestamp,
          );
          if (existingDataPoint) {
            Object.assign(existingDataPoint, newDataPoint);
          } else {
            mergedData.push(newDataPoint);
          }
        });

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

// ! old code, display all data since the beginning till current timestamp
// "use client";

// import { useEffect, useState } from "react";
// import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

// const chartConfig = {
//   agv1: {
//     label: "AGV 1",
//     color: "hsl(var(--chart-1))",
//   },
//   agv2: {
//     label: "AGV 2",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig;

// export function SpeedLineChart() {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const ws = new WebSocket("ws://localhost:8000/ws/data/");

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       const newChartData = data.agvs_array_data.map((agv) => ({
//         timestamp: new Date(agv.time_stamp).toLocaleTimeString(),
//         [`agv${agv.car_id}`]: agv.agv_speed,
//       }));

//       setChartData((prevData) => {
//         const mergedData = [...prevData];
//         newChartData.forEach((newDataPoint) => {
//           const existingDataPoint = mergedData.find(
//             (dataPoint) => dataPoint.timestamp === newDataPoint.timestamp,
//           );
//           if (existingDataPoint) {
//             Object.assign(existingDataPoint, newDataPoint);
//           } else {
//             mergedData.push(newDataPoint);
//           }
//         });
//         return mergedData;
//       });
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Speed Line Chart - Multiple AGVs</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig} className="max-h-72 w-full">
//           <LineChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="timestamp"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//             />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
//             <Line
//               dataKey="agv1"
//               type="monotone"
//               stroke="var(--color-agv1)"
//               strokeWidth={2}
//               dot={false}
//             />
//             <Line
//               dataKey="agv2"
//               type="monotone"
//               stroke="var(--color-agv2)"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }
