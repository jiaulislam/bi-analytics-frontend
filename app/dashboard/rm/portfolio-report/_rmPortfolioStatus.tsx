import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { numberToMillionsString } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { IPortfolioManagement } from "@/types/rmPortfolio";

interface Props {
  records: IPortfolioManagement[];
}

export default function PortfolioManagementStatusDataTable({ records }: Props) {
  return (
    <Card className="col-span-2 overflow-y-auto max-h-[385px] bg-[#0e5e6f]">
      <CardHeader>
        <CardTitle className="text-white">
          Portfolio Management Status
        </CardTitle>
        {/* <CardDescription className="text-white">
          short summary of the portfolio
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-500 hover:bg-blue-700">
              <TableHead className="w-auto text-white font-bold">
                Particular
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                key={record.particular}
                className={`${
                  index % 2 === 0 ? "bg-pink-200" : "bg-yellow-200"
                } hover:bg-green-300 transition-all duration-300`}
              >
                <TableCell className="font-medium py-1">
                  {record.particular}
                </TableCell>
                <TableCell className="py-1 text-right">
                  {numberToMillionsString(record.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
