import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const FORMATTER_OPTIONS: Intl.NumberFormatOptions = {
  maximumFractionDigits: 1,
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numberFormatter = (
  value: number,
  options: Intl.NumberFormatOptions = FORMATTER_OPTIONS
) => {
  return new Intl.NumberFormat("en-US", options).format(value);
};

export function formatDate(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function numberToMillionsString(
  num: number,
  useThousand: boolean = false
): string {
  if (isNaN(num)) {
    throw Error(`${num} is not a valid number !`);
  }

  const absNumber = Math.abs(num);

  if (useThousand) {
    if (absNumber >= 1000 && absNumber < 1000000) {
      return `${numberFormatter(num / 1000)}K`;
    } else if (absNumber < 1000) {
      return numberFormatter(num);
    }
  }

  if (absNumber < 1_00_0000) {
    return numberFormatter(absNumber);
  }

  if (absNumber < 10_00_0000) {
    return `${numberFormatter(num / 1000000)}M`;
  }

  if (absNumber < 1_00_000_0000) {
    return `${numberFormatter(num / 10_00_000)}M`;
  }

  return `${numberFormatter(num / 10_00_000)}M`;
}

export function successResponse(key: string): boolean {
  return key === "success";
}
