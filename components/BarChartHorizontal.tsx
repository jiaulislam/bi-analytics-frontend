"use client";
import { FC } from "react";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Rectangle,
} from "recharts";

import { numberFormatter, numberToMillionsString } from "@/lib/utils";
import { TOOLTIP_BACKGROUND } from "./ui/utils/constants";
import { Separator } from "./ui/separator";
import { AiTwotoneAlert } from "react-icons/ai";

interface BarData {
  name: string;
  value: string | number;
}

interface BarOption {
  dataKey: string;
  valueKey: string;
  fill: string;
  stroke: string;
  height?: number;
  barLabel?: boolean;
  legendName?: string;
}

interface BarChartProps {
  data: BarData[];
  option: BarOption;
}

interface CustomizedLabelProps {
  x?: number;
  y?: number;
  fill?: string;
  value?: number;
}

const CustomizedLabel: FC<CustomizedLabelProps> = ({
  x = 0,
  y = 0,
  fill = "#C6C6C6",
  value = 0,
}) => {
  return (
    <text
      x={x}
      y={y}
      fontSize="16"
      fontFamily="sans-serif"
      fill={fill}
      textAnchor="start"
    >
      {numberToMillionsString(value)}
    </text>
  );
};
interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadType[];
  label?: number;
}

type PayloadType = {
  value: string | number;
  name: string;
  payload: BarData;
  color: string;
  dataKey: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    return (
      <div
        style={{
          backgroundColor: TOOLTIP_BACKGROUND,
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "1px 2px 10px -2px #7873ffb1",
        }}
      >
        <p>{label}</p>
        <Separator className="border-gray-500" />
        {payload.map((pld: PayloadType) => {
          const innerPayload = pld.payload;
          return (
            <p
              key={pld.name}
              style={{
                borderStyle: "solid 1px",
                fontSize: "12px",
                fontWeight: "600",
                fontFamily: "sans-serif",
                color: pld.color,
              }}
            >
              {`${pld.name} : ${numberFormatter(innerPayload.value as number)}`}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

const BarChart: FC<BarChartProps> = ({ data, option }) => {
  const TICK_COLOR = "#C7C7C7";
  const CARTESIAN_GRID_COLOR = "#565656";
  return (
    <ResponsiveContainer height={option?.height ?? 300} width="100%">
      <RechartsBarChart
        barCategoryGap={1}
        layout="vertical"
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 65,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray={"3 3"}
          stroke={CARTESIAN_GRID_COLOR}
          horizontal={false}
          opacity={0.3}
        />
        <XAxis
          type="number"
          tick={{ stroke: TICK_COLOR, strokeOpacity: 0.1, fontSize: 12 }}
          tickLine={false}
          tickFormatter={(value) => numberToMillionsString(value as number)}
        />
        <YAxis
          type="category"
          minTickGap={1}
          dataKey={option.dataKey}
          tick={{ stroke: TICK_COLOR, strokeOpacity: 0.1, fontSize: 12 }}
        />
        {option?.legendName ?? <Legend name={option.legendName} />}
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey={option.valueKey}
          fill={option.fill}
          legendType="line"
          barSize={12}
          // radius={[0, 5, 5, 0]}
          label={option?.barLabel ? <CustomizedLabel /> : ""}
          activeBar={<Rectangle fill={option.fill} stroke={option.stroke} />}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

interface BarCharHorizonalProps {
  data: BarData[];
  options: BarOption;
}

const BarChartHorizontal: FC<BarCharHorizonalProps> = ({ data, options }) => {
  return data.length ? (
    <BarChart data={data} option={options} />
  ) : (
    <div className="font-semibold text-lg text-gray-600 flex justify-center items-center">
      <AiTwotoneAlert className="mr-2 h-6 w-5"/> No data available
    </div>
  );
};

export default BarChartHorizontal;
