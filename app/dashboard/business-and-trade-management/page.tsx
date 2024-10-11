"use client";
import PageHeader from "@/components/PageHeader";
import BoardWiseTurnover from "./_board_wise_turnover";
import BoardWiseTurnoverBreakdown from "./_board_wise_turnover_breakdown";
import DetailsMarketShareLBSL from "./_details_market_share_of_lbsl";
import DetailsMarketShareSME from "./_details_market_share_of_lbsl_sme_atb";
import { useEffect, useState } from "react";
import {
  BoardWiseTurnoverData,
  BoardWiseTurnoverBreakdownData,
  MarketShareLBSl,
  MarketShareSME,
  CompanyWiseTotalSelableStock,
  SelableStockPercentage,
  InvestorWiseTotalSelableStock,
} from "@/types/businessTradManagement";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { successResponse } from "@/lib/utils";
import { IResponse } from "@/types/utils";
import { DataTableCard } from "./data-table";
import {
  companyWiseSalableStock,
  SalableStockPercentage,
  InvestorWiseSalableStock,
} from "./columns";

export default function BusinessAndTradeManagement() {
  const { data: session } = useSession();
  const [boardTernoverData, setBoardTernoverData] = useState<
    BoardWiseTurnoverData[] | null
  >(null);
  const [boardTernoverBreakdownData, setBoardTernoverBreakdownData] = useState<
    BoardWiseTurnoverBreakdownData[] | null
  >(null);
  const [marketShareLBSL, setMarketShareLBSL] = useState<
    MarketShareLBSl[] | null
  >(null);
  const [marketShareSME, setMarketShareSME] = useState<MarketShareSME[] | null>(
    null
  );
  const [companyWiseTotalSalableStock, setCompanyWiseTotalSalableStock] =
    useState<CompanyWiseTotalSelableStock[]>([]);
  const [salableStockPercentage, setSalableStockPercentage] = useState<
    SelableStockPercentage[]
  >([]);
  const [investorWiseTotalSalableStock, setInvestorWiseTotalSalableStock] =
    useState<InvestorWiseTotalSelableStock[]>([]);
  // on page load
  useEffect(() => {
    // board ternover data
    const fetchBoardTernoverData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/board-turnover/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          BoardWiseTurnoverData[]
        >;
        if (successResponse(result.status)) {
          setBoardTernoverData(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching bord wise turnover`,
          error
        );
      }
    };
    // board ternover breakdown data
    const fetchBoardTernoverBreakdownData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/board-turnovers-breakdown/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          BoardWiseTurnoverBreakdownData[]
        >;
        if (successResponse(result.status)) {
          setBoardTernoverBreakdownData(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching bord wise turnover breadown`,
          error
        );
      }
    };
    // board ternover details market share LBSL
    const fetchMarketShareLBSL = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/market-share-details/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<MarketShareLBSl[]>;
        if (successResponse(result.status)) {
          setMarketShareLBSL(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching details market share LBSL`,
          error
        );
      }
    };
    // board ternover details market share LBSL SME
    const fetchMarketShareSME = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/atb-market-share-details/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<MarketShareSME[]>;
        if (successResponse(result.status)) {
          setMarketShareSME(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching details market share LBSL SME`,
          error
        );
      }
    };
    // CompanyWise Totoal Salable Stock
    const fetchCompanyWiseTotoalSalableStock = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/companywise-saleable-stock/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          CompanyWiseTotalSelableStock[]
        >;
        if (successResponse(result.status)) {
          setCompanyWiseTotalSalableStock(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching Company Wise Totoal Salable Stock`,
          error
        );
      }
    };
    // CompanyWise Totoal Salable Percentage
    const fetchSalableStockPercentage = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/companywise-saleable-stock-percentage/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          SelableStockPercentage[]
        >;
        if (successResponse(result.status)) {
          setSalableStockPercentage(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching Company Wise Totoal Salable Percentage`,
          error
        );
      }
    };
    // InvestorWise Totoal Salable Stock
    const fetchInvestorWiseTotoalSalableStock = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/investorwise-saleable-stock/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          InvestorWiseTotalSelableStock[]
        >;
        if (successResponse(result.status)) {
          setInvestorWiseTotalSalableStock(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching InvestorWise Totoal Salable Stock`,
          error
        );
      }
    };
    fetchBoardTernoverData();
    fetchBoardTernoverBreakdownData();
    fetchMarketShareLBSL();
    fetchMarketShareSME();
    fetchCompanyWiseTotoalSalableStock();
    fetchSalableStockPercentage();
    fetchInvestorWiseTotoalSalableStock();
  }, []);

  return (
    <div className="mx-4">
      <title>Business and Trade Management | LBSL</title>
      <meta
        name="description"
        content="Showing a  usiness and trade  management"
      />
      <PageHeader name="Business and Trade  Management"></PageHeader>
      <div className="grid grid-cols-6 gap-3 xl:grid-cols-6 mt-2">
        {boardTernoverData ? (
          <BoardWiseTurnover datalist={boardTernoverData as any} />
        ) : null}

        {boardTernoverBreakdownData ? (
          <BoardWiseTurnoverBreakdown
            datalist={boardTernoverBreakdownData as any}
          />
        ) : null}

        {marketShareLBSL ? (
          <DetailsMarketShareLBSL datalist={marketShareLBSL as any} />
        ) : null}

        {marketShareSME ? (
          <DetailsMarketShareSME datalist={marketShareSME as any} />
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-3 mt-2 lg:grid-cols-4">
        {companyWiseTotalSalableStock ? (
          <DataTableCard
            title="CompanyWise Total Saleable Stock"
            subtitle="show data for CompanyWise Total Saleable Stock"
            className="col-span1 overflow-y-auto lg:col-span-2 lg:row-span-2"
            columns={companyWiseSalableStock}
            data={companyWiseTotalSalableStock}
          />
        ) : null}
        {salableStockPercentage ? (
          <DataTableCard
            title="Saleable Percentage"
            subtitle="show data for Saleable Percentage"
            className="col-span1 overflow-y-auto lg:col-span-2 lg:row-span-2"
            columns={SalableStockPercentage}
            data={salableStockPercentage}
          />
        ) : null}
      </div>
      <div className="grid grid-cols-12 gap-3 mt-2">
        {investorWiseTotalSalableStock ? (
          <DataTableCard
            title="Investor Wise Total Saleable Stock"
            subtitle="show data for investor wise total saleable stock "
            className="col-span-12 overflow-y-auto lg:col-span-12 lg:row-span-2" // Update to span all 12 columns
            columns={InvestorWiseSalableStock}
            data={investorWiseTotalSalableStock}
          />
        ) : null}
      </div>
    </div>
  );
}
