import type { LucideIcon } from "lucide-react";


interface Props {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
    trend?: "up" | "down";
}
export const SummaryCard = ({ title, value, description, icon, trend }: Props) => {
    const Icon = icon;
    const color = trend === "up" ? "text-red-900" : trend === "down" ? "text-green-900" : ""
    return (
        <div className="bg-gray-800 border-gray-700 border rounded-xl p-4 flex flex-col gap-2">
            <div className="w-fit rounded-lg bg-gray-700 p-2">
                <Icon className="text-amber-400" />
            </div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>
                {
                    trend === "up" ? `+ ${value} %`
                        : trend === "down" ? `- ${value} %`
                            : value
                }
            </p>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
    )
}