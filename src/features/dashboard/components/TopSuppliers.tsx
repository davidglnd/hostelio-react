import { Link } from "react-router";

import { Truck } from "lucide-react"
interface SupplierExpense {
    supplier: string
    amount: number
    id: number
}

const mockSuppliers: SupplierExpense[] = [
    {
        supplier: "Bebidas granadinas",
        amount: 2000,
        id: 1,
    },
    {
        supplier: "Cruzcampo",
        amount: 1500,
        id: 2,
    },
    {
        supplier: "Cárnicas del sur",
        amount: 5700,
        id: 3,
    },
]
export const TopSuppliers = () => {
    const maxAmount = Math.max(0, ...mockSuppliers.map((item) => item.amount));
    const sortedTopSuppliers = [...mockSuppliers].sort((a, b) => b.amount - a.amount).slice(0, 5);
    return (
        <div className="h-full bg-gray-800 border-gray-700 border rounded-xl p-4 flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between p-2 gap-2">
                <div>
                    <h2 className="text-xl font-bold text-gray-50">Proveedores con más gasto</h2>
                    <p className="text-sm text-gray-400">
                        {new Intl.DateTimeFormat("es-ES", {
                            month: "long",
                            year: "numeric"
                        }).format(new Date())}
                    </p>
                </div>
                <Truck className="text-amber-400" size={30} />
            </div>
            <div className="space-y-4 p-4">
                {mockSuppliers.length === 0
                    ? <p>Todavía no hay gastos registrados por proveedor.</p>
                    : sortedTopSuppliers.map((item) => {
                        const percentage = maxAmount > 0
                            ? Math.round((item.amount / maxAmount) * 100)
                            : 0;
                        return (
                            <div key={item.id} className="border-b border-gray-700 last:border-b-0 p-4 flex flex-col gap-2 cursor-pointer hover:bg-gray-700/50 transition-colors rounded-md">
                                <Link
                                    to={`/gastos?proveedor=${item.id}`}
                                    className="w-full flex items-start justify-between gap-3"
                                >
                                    <p className="min-w-0">{item.supplier}</p>
                                    <p className="shrink-0 whitespace-nowrap">
                                        {new Intl.NumberFormat("es-ES", {
                                            style: "currency",
                                            currency: "EUR"
                                        }).format(item.amount)}
                                    </p>
                                </Link>
                                <div className="w-full h-2 bg-gray-700 rounded-full">
                                    <div
                                        className="h-full bg-amber-500 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}