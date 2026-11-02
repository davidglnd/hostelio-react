import { ActivityItem } from "./ActivityItem"
import type { Expense } from "@/features/expenses/types/expense.types";

interface RecentActivityProps {
    expensesData: (Expense & { supplierName: string })[];
}

export const RecentActivity = ({ expensesData }: RecentActivityProps) => {

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
                {expensesData.map((expense) => <div className="border-b border-gray-700 last:border-b-0 p-2" key={expense.id}>
                    <ActivityItem
                        supplier={expense.supplierName}
                        category={expense.category}
                        date={expense.date} amount={expense.amount}
                        paymentStatus={expense.paymentStatus}
                    />
                </div>
                )}
            </div>
        </div>
    )
}