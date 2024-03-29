import Statistics from "./ui/statistics";
import { FC } from "react";
import { IShortSummary } from "@/types/dailyTurnoverPerformance";

interface SummaryData {
  data: IShortSummary;
}

const StatisticsCardClientTurnoverSummary: FC<SummaryData> = ({ data }) => {
  const { totalClients, totalActiveClients, dailyTurnover, netBuySell } = data;
  const activeClientRatio = Math.round(
    (totalActiveClients.value / totalClients.value) * 100
  );
  return (
    <div className="flex h-full w-full flex-row justify-between items-center">
      <Statistics label={totalClients.name} value={totalClients.value} />
      <div className="flex relative">
        <Statistics
          label={totalActiveClients.name}
          value={totalActiveClients.value}
        />
        <div className="absolute -right-4 top-4 rounded-full w-7 bg-gray-200 text-center">
          <span className="text-[14px] text-gray-700 font-semibold p-[4px]">
            {activeClientRatio}%
          </span>
        </div>
      </div>

      <Statistics label={dailyTurnover.name} value={dailyTurnover.value} />
      <Statistics label={netBuySell.name} value={netBuySell.value} />
    </div>
  );
};

export default StatisticsCardClientTurnoverSummary;
