import type { LucideIcon } from "lucide-react";

export interface Activity {
    id: number;
    supplier: string;
    category: string;
    date: string;
    amount: number;
    status: "pending" | "paid";
    icon: LucideIcon;
}