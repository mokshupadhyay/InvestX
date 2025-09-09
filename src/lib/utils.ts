import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Currency formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Number formatting
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-IN").format(num);
};

// Date formatting
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Get investment type color classes
export const getInvestmentTypeColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case "bond":
      return "bg-blue-100 text-blue-800";
    case "fd":
      return "bg-green-100 text-green-800";
    case "mf":
      return "bg-purple-100 text-purple-800";
    case "etf":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Get risk level color classes
export const getRiskLevelColor = (risk: string): string => {
  switch (risk.toLowerCase()) {
    case "low":
      return "bg-green-100 text-green-800";
    case "moderate":
      return "bg-yellow-100 text-yellow-800";
    case "high":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Calculate investment returns
export const calculateReturns = (
  amount: number,
  annualYield: number,
  tenureMonths: number
): number => {
  return amount + (amount * annualYield * tenureMonths) / (100 * 12);
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
