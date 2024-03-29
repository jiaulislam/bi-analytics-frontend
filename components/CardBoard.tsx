import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface CardBoardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const CardBoard: React.FC<CardBoardProps> = ({
  title,
  subtitle,
  children,
  className,
}) => {
  return (
    <Card
      className={cn("bg-gradient-to-br from-gray-50 to-slate-200 drop-shadow-md", className)}
    >
      <CardHeader>
        <CardTitle className="text-slate-600">{title}</CardTitle>
        <CardDescription className="text-slate-500">
          {subtitle ?? ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        {children}
      </CardContent>
    </Card>
  );
};

export default CardBoard;
