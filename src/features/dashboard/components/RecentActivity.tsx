import { Beef, Beer } from "lucide-react"
import { ActivityItem } from "./ActivityItem"
import type { Activity } from "../types/activity.types"

const mockActivities: Activity[] = [
    {
        supplier: "Bebidas granadinas",
        category: "Bebidas",
        date: "22-10",
        amount: 2000,
        status: "pending",
        icon: Beer,
        id: 1,
    },
    {
        supplier: "Cruzcampo",
        category: "Bebidas",
        date: "22-10",
        amount: 1500,
        status: "paid",
        icon: Beer,
        id: 2,
    },
    {
        supplier: "Cárnicas del sur",
        category: "Alimentación",
        date: "22-10",
        amount: 700,
        status: "paid",
        icon: Beef,
        id: 3,
    },
    {
        supplier: "Transgourmet",
        category: "Alimentación",
        date: "22-10",
        amount: 650,
        status: "pending",
        icon: Beef,
        id: 4,
    }
]

export const RecentActivity = () => {
    return (
        <div className="bg-gray-800 border-gray-700 border rounded-xl p-4 flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between p-2 ">
                <div>
                    <h2 className="text-xl font-bold text-gray-50">Actividad reciente</h2>
                    <p className="text-sm text-gray-400">Últimos movimientos de tu negocio</p>
                </div>
                <p className="text-sm text-amber-400 cursor-pointer">Ver todos --</p>
            </div>
            <div className="space-y-4 p-4">
                {mockActivities.map((item) => <div className="border-b border-gray-700 last:border-b-0 p-2" key={item.id}>
                    <ActivityItem
                        supplier={item.supplier} category={item.category}
                        date={item.date} amount={item.amount}
                        status={item.status === "pending" ? "pending" : "paid"} icon={item.icon}
                    />
                </div>
                )}
            </div>
        </div>
    )
}