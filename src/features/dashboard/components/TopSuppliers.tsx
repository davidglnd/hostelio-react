import { Link } from "react-router";

import { Truck } from "lucide-react"
interface TopSuppliersProps {
    topSuppliers: SupplierTotal[],
    monthlyTotal: number;
}
interface SupplierTotal {
    supplierId: string;
    supplierName: string;
    totalAmount: number;
}

export const TopSuppliers = ({ topSuppliers, monthlyTotal }: TopSuppliersProps) => {
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
                {topSuppliers.length === 0
                    ? <p>Todavía no hay gastos registrados por proveedor.</p>
                    : topSuppliers.map((item) => {
                        const percentage = monthlyTotal > 0
                            ? Math.round((item.totalAmount / monthlyTotal) * 100)
                            : 0;
                        return (
                            <div key={item.supplierId} className="border-b border-gray-700 last:border-b-0 p-4 flex flex-col gap-2 cursor-pointer hover:bg-gray-700/50 transition-colors rounded-md">
                                <Link
                                    to={`/gastos?proveedor=${item.supplierId}`}
                                    className="w-full flex items-start justify-between gap-3"
                                >
                                    <p className="min-w-0">{item.supplierName}</p>
                                    <p className="shrink-0 whitespace-nowrap">
                                        {new Intl.NumberFormat("es-ES", {
                                            style: "currency",
                                            currency: "EUR"
                                        }).format(item.totalAmount)}
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