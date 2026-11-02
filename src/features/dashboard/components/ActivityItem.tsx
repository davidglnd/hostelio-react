import type { Expense } from "@/features/expenses/types/expense.types";
import { Beer, Beef, Euro } from "lucide-react";
type ActivityItemProps = Pick<
    Expense,
    "category" | "date" | "amount" | "paymentStatus"
> & { supplier: string };

export const ActivityItem = ({ supplier, category, date, amount, paymentStatus }: ActivityItemProps) => {

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <div className="rounded-full bg-gray-700 p-3 flex items-center justify-center ">
                    {
                        category === "Alimentación"
                            ? <Beef className="text-amber-400" size={20} />
                            : category === "Bebidas"
                                ? <Beer className="text-amber-400" size={20} />
                                : <Euro className="text-amber-400" size={20} />
                    }

                </div>
                <div className="flex flex-col">
                    <h3 className="text-gray-50 font-medium">{supplier}</h3>
                    <p className="text-sm text-gray-400">{category} · {date}</p>
                </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                <p className="font-semibold text-gray-50">
                    {
                        new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(-amount)
                    }
                </p>
                {
                    paymentStatus === "paid"
                        ? <p className="text-green-700  text-sm font-medium">Pagado</p>
                        : <p className="text-amber-700 text-sm font-medium">Pendiente</p>
                }
            </div>
        </div>
    )
}