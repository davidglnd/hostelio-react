import type { Activity } from "../types/activity.types";

export const ActivityItem = ({ supplier, category, date, amount, status, icon }: Omit<Activity, "id">) => {
    const Icon = icon;
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="rounded-full bg-gray-700 p-3 flex items-center justify-center ">
                    <Icon className="text-amber-400" size={20} />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-gray-50 font-medium">{supplier}</h3>
                    <p className="text-sm text-gray-400">{category} · {date}</p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold text-gray-50">
                    - {
                        new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount)
                    }
                </p>
                {
                    status === "paid"
                        ? <p className="text-green-700  text-sm font-medium">Pagado</p>
                        : <p className="text-amber-700 text-sm font-medium">Pendiente</p>
                }
            </div>
        </div>
    )
}