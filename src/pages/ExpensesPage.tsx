import { useSearchParams } from "react-router";

import { mockSuppliers } from "@/features/suppliers/data/mockSuppliers"
import { mockExpenses } from "@/features/expenses/data/mockExpenses"
import { ExpensesTable } from "@/features/expenses/components/ExpensesTable";

export const ExpensesPage = () => {
    const [searchParams] = useSearchParams();
    const suppliersData = mockSuppliers;
    const expensesData = mockExpenses.map((expense) => ({
        ...expense,
        supplierName: suppliersData.find((supplier) => supplier.id === expense.supplierId)?.name ?? "Proveedor desconocido",
    }))

    const supplierId = searchParams.get("proveedor");
    const supplierName = suppliersData.find((supplier) => supplier.id === supplierId)?.name

    const urlExpensesData = supplierId === null
        ? expensesData
        : supplierName === undefined
            ? []
            : expensesData.filter((expense) => expense.supplierId === supplierId)



    return (
        <div className="p-8 space-y-6">
            {
                supplierId === null
                    ? <div>
                        <h1 className="text-2xl font-bold text-gray-50">Gastos</h1>
                    </div>
                    : supplierName === undefined
                        ? <h1 className="text-2xl font-bold text-gray-50">Proveedor no encontrado</h1>
                        : <div>
                            <h1 className="text-2xl font-bold text-gray-50">Gastos de {supplierName}</h1>
                            <p className="text-gray-400 text-sm">Gastos del proveedor.</p>
                        </div>
            }
            <ExpensesTable expensesData={urlExpensesData}
            />

        </div>
    )
}