/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Define the structure of each data point in the chart
interface ChartData {
  month: string;
  totalEarnings: number;
}

const Bar_Chart = ({ data }: { data: ChartData[] }) => {


  const maxEarnings = useMemo(() => {
    if (!data?.length) return 0;
    return Math.max(...data.map((d) => d.totalEarnings ?? 0));
  }, [data]);

  // ✅ Reference line positions: 20%, 40%, 60%, 80% of max
  const referenceLines = useMemo(() => {
    const percents = [0.2, 0.4, 0.6, 0.8];

    // If max is 0, no need to draw lines
    if (maxEarnings <= 0) return [];

    return percents.map((p) => ({
      percent: Math.round(p * 100),
      y: maxEarnings * p,
    }));
  }, [maxEarnings]);


  // Custom tooltip to display the information
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].payload.totalEarnings; // Access your data key
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <p style={{ margin: 0, color: "#202020" }}>{`Month: ${label}`}</p>
          <p style={{ margin: 0, color: "#0a0a08" }}>{`Earnings: ${value}€`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tick style for X and Y axes
  const tickStyle = { fill: "#000" };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
          barCategoryGap={30} // Adjust the gap between bars if necessary
        >
          {/* Use your custom tooltip */}
          <Tooltip content={<CustomTooltip />} />

          <XAxis dataKey="month" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tick={{ ...tickStyle }}
            axisLine={{
              stroke: "#0861C500", // Y-axis line color
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
            tickMargin={16}
          />
          {/* Add several horizontal black lines using ReferenceLine */}
          {referenceLines.map((line) => (
            <ReferenceLine
              key={line.percent}
              y={line.y}
              stroke="#20202055"
              strokeDasharray="6 6"
            />
          ))}

          <Bar
            dataKey="totalEarnings" // Make sure this matches your data key
            fill="url(#incomeGradient)"
            barSize={20}
            radius={[10, 10, 10, 10]}
          />

          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#AD2B08" />
              <stop offset="100%" stopColor="#AD2B08" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar_Chart;
