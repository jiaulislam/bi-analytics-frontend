"use client";

import PageHeader from "@/components/PageHeader";
import BranchFilter from "@/components/branchFilter";
import TraderFilter, { ITrader } from "@/components/traderFilter";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import RMFundCollectionTable from "./_rmFundCollection";
import PortfolioManagementStatusDataTable from "./_rmPortfolioStatus";
import CardBoard from "@/components/CardBoard";
import BarChartPositiveNegative from "@/components/BarChartPositiveNegative";
import { BarColors } from "@/components/ui/utils/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { successResponse } from "@/lib/utils";
import {
  IFundCollection,
  IMarkedClient,
  INetFundFlow,
  IPortfolioManagement,
} from "@/types/rmPortfolio";
import MarkedTraderDataTable from "./_marked_traders_datatable";
import SummarySkeletonCard from "@/components/skeletonCard";
import { IResponse } from "@/types/utils";
import { RoleType } from "@/app/schemas";

const RmPortfolioBoard = () => {
  // Override console.error
  // This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
  // @link https://github.com/recharts/recharts/issues/3615
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  // ===========================================
  const { data: session } = useSession();

  const isRM = session?.user.role.toString() === RoleType.REGIONAL_MANAGER;
  // TODO : Need to inject BranchCode in the session object
  const defaultBranch = isRM ? "12" : "";
  const defaultTrader = isRM ? session.user.username : "";

  const [branch, setBranch] = useState(defaultBranch);
  const [trader, setTrader] = useState(defaultTrader);
  const [traders, setTraders] = useState<ITrader[]>([]);

  const [fundCollections, setFundCollection] = useState<IFundCollection[]>([]);
  const [redClients, setRedClients] = useState<IMarkedClient[]>([]);
  const [yellowClients, setYellowClients] = useState<IMarkedClient[]>([]);
  const [portfolio, setPortfolio] = useState<IPortfolioManagement[]>([]);
  const [netFundFlow, setNetFundFlow] = useState<INetFundFlow[]>([]);

  const handleBranchChange = (value: string) => {
    setBranch(value);
    setTrader(traders[0]?.traderId);
  };
  const handleTraderChange = (value: string) => {
    setTrader(value);
  };

  const dailyNetFundFlowOption = {
    dataKey: "tradingDate",
    valueKey: "amount",
    fill: BarColors.orange,
    stroke: "#c3ce",
    barLabel: true,
  };

  useEffect(() => {
    if (branch && trader) {
      const fetchFundCollections = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/fund-collections/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            IFundCollection[]
          >;
          if (successResponse(result.status)) {
            setFundCollection(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
      const fetchPortfolio = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/portfolio-management-status/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            IPortfolioManagement[]
          >;
          if (successResponse(result.status)) {
            setPortfolio(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };

      const fetchYellowClients = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/marked-clients/?branch=${branch}&category=yellow&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<IMarkedClient[]>;
          if (successResponse(result.status)) {
            setYellowClients(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
      const fetchRedClients = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/marked-clients/?branch=${branch}&category=red&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<IMarkedClient[]>;
          if (successResponse(result.status)) {
            setRedClients(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
      const fetchINetFundFlow = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/daily-net-fund-flow/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<INetFundFlow[]>;
          if (successResponse(result.status)) {
            setNetFundFlow(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
      fetchFundCollections();
      fetchRedClients();
      fetchYellowClients();
      fetchPortfolio();
      fetchINetFundFlow();
    }
  }, [trader]);

  useEffect(() => {
    if (branch) {
      // Fetch Traders
      const fetchTraderWithBranchId = async () => {
        try {
          let branchUrl;
          if (branch) {
            branchUrl = `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/lov/traders/${branch}/`;
          } else {
            branchUrl = `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/lov/traders/`;
          }
          const response = await fetch(branchUrl, {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          });

          const result = (await response.json()) as IResponse<ITrader[]>;
          if (successResponse(result.status)) {
            setTraders(result.data);
            setTrader(result.data[0].traderId);
          }
        } catch (error) {
          console.error(`Error fetching traders.`, error);
        }
      };
      fetchTraderWithBranchId();
    }
  }, [branch]);

  return (
    <div className="mx-4">
      <PageHeader name="RM Portfolio Report">
        <BranchFilter onChange={handleBranchChange} currentBranch={branch} />
        <TraderFilter
          traders={traders}
          currentTrader={trader}
          onChange={handleTraderChange}
        />
      </PageHeader>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-6 mt-4">
        {/* Daily Net Fund Flow Chart */}
        {netFundFlow ? (
          <CardBoard
            className="lg:col-span-3"
            title="Daily Net Fund Flow"
            // subtitle="short summary of the portfolio"
            children={
              <BarChartPositiveNegative
                data={netFundFlow as any}
                options={dailyNetFundFlowOption}
              />
            }
          />
        ) : (
          <SummarySkeletonCard className="col-span-3" />
        )}
        {/* Zonal Marked Investors */}
        <Tabs defaultValue="red" className="col-span-3 ">
          <TabsList className="grid w-full grid-cols-2 bg-[#0e5e6f]">
            <TabsTrigger
              value="red"
              className="text-white active:bg-gradient-to-r active:from-teal-700 active:via-teal-600 active:to-teal-500"
            >
              Red
            </TabsTrigger>
            <TabsTrigger
              value="yellow"
              className="text-white active:bg-gradient-to-r active:from-teal-700 active:via-teal-600 active:to-teal-500"
            >
              Yellow
            </TabsTrigger>
          </TabsList>
          <TabsContent value="red">
            <Card className="bg-[#0e5e6f]">
              <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
                <CardTitle className="text-white text-md text-lg">Red Clients</CardTitle>
                {/* <CardDescription className="text-white">
                  red clients details
                </CardDescription> */}
              </CardHeader>
              <CardContent className="space-y-2 overflow-y-auto max-h-[250px] mt-3">
                <MarkedTraderDataTable records={redClients} clientType="red" />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="yellow">
            <Card className="bg-[#0e5e6f]">
              <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
                <CardTitle className="text-white text-md text-lg">Yellow Clients</CardTitle>
                {/* <CardDescription className="text-white">
                  yellow clients details
                </CardDescription> */}
              </CardHeader>
              <CardContent className="space-y-2 overflow-y-auto max-h-[250px] mt-3">
                <MarkedTraderDataTable records={yellowClients} clientType="yellow" />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        {/* Fund Collection Status */}
        {fundCollections ? (
          <RMFundCollectionTable records={fundCollections} />
        ) : (
          <SummarySkeletonCard className="col-span-4" />
        )}

        {/* Portfolio Management Status */}
        {portfolio ? (
          <PortfolioManagementStatusDataTable records={portfolio} />
        ) : (
          <SummarySkeletonCard className="col-span-2" />
        )}
      </div>
    </div>
  );
};

export default RmPortfolioBoard;
