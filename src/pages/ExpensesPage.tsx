import { useState } from "react";
import { useSearchParams } from "react-router";

import { useExpenses } from "@/features/expenses/hooks/useExpenses";
import { mockSuppliers } from "@/features/suppliers/data/mockSuppliers"
import { ExpensesTable } from "@/features/expenses/components/ExpensesTable";
import { ExpensesFilters } from "@/features/expenses/components/ExpensesFilters";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ExpensesPage = () => {
    const [searchParams] = useSearchParams();
    const supplierId = searchParams.get("proveedor");

    return (
        <ExpensesContent
            key={supplierId ?? "all"}
            supplierId={supplierId}
        />
    );
};
const ExpensesContent = ({ supplierId }: { supplierId: string | null }) => {
    const [paymentStatusFilter, setPaymentStatusFilter] = useState<"all" | "pending" | "paid">("all");
    const [pageTable, setPageTable] = useState<number>(1);
    const { expenses } = useExpenses();
    const suppliersData = mockSuppliers;
    const expensesData = expenses.map((expense) => ({
        ...expense,
        supplierName: suppliersData.find((supplier) => supplier.id === expense.supplierId)?.name ?? "Proveedor desconocido",
    }))

    const supplierName = suppliersData.find((supplier) => supplier.id === supplierId)?.name

    const urlExpensesData = supplierId === null
        ? expensesData
        : supplierName === undefined
            ? []
            : expensesData.filter((expense) => expense.supplierId === supplierId)

    const paymentStatusFilteredExpenses = urlExpensesData.filter((expense) => {
        return (
            paymentStatusFilter === "all"
                ? true
                : expense.paymentStatus === paymentStatusFilter
        )
    });
    const totalPages = Math.ceil(paymentStatusFilteredExpenses.length / 10);
    const paginatedExpenses = paymentStatusFilteredExpenses.slice((pageTable - 1) * 10, pageTable * 10);

    const handlePaymentStatusChange = (paymentStatusFilter: "all" | "paid" | "pending") => {
        setPageTable(1);
        setPaymentStatusFilter(paymentStatusFilter);
    }
    return (
        <div className="p-8 space-y-6">
            {
                supplierId === null
                    ? <div>
                        <h1 className="text-2xl font-bold text-gray-50">Gastos</h1>
                        <div className="h-px bg-gray-700" />
                    </div>
                    : supplierName === undefined
                        ? <h1 className="text-2xl font-bold text-gray-50">Proveedor no encontrado</h1>
                        : <div>
                            <h1 className="text-2xl font-bold text-gray-50">Gastos de {supplierName}</h1>
                            <p className="text-gray-400 text-sm">Gastos del proveedor.</p>
                        </div>
            }
            <div className="p-4 bg-gray-800 border-gray-700 border rounded-xl">
                <p>Herramientas de filtrado</p>
                <ExpensesFilters paymentStatusFilter={paymentStatusFilter} changePaymentStatusFilter={handlePaymentStatusChange}></ExpensesFilters>
            </div>
            {
                supplierId !== null && supplierName === undefined
                    ? null
                    : urlExpensesData.length === 0
                        ? <p>
                            {supplierId === null
                                ? "No hay gastos registrados."
                                : "Este proveedor no tiene gastos registrados."}
                        </p>
                        : paymentStatusFilteredExpenses.length === 0
                            ? <p>No hay gastos con el estado seleccionado</p>
                            :
                            <div className="min-h-125">
                                <ExpensesTable expensesData={paginatedExpenses} />
                            </div>

            }
            {
                paymentStatusFilteredExpenses.length === 0
                    ? null
                    : <div className="flex justify-center gap-2 items-center ">
                        <Button className="hover:bg-gray-700 hover:text-amber-400 border border-gray-700" aria-label="Página anterior" onClick={() => { setPageTable(pageTable - 1) }} disabled={pageTable === 1}>
                            <ChevronLeft />
                        </Button>
                        <p className="text-sm text-gray-400">Página {pageTable} de {totalPages}</p>
                        <Button className="hover:bg-gray-700 hover:text-amber-400 border border-gray-700" aria-label="Página siguiente" onClick={() => setPageTable(pageTable + 1)} disabled={pageTable >= totalPages}>
                            <ChevronRight />
                        </Button>
                    </div>
            }
        </div >
    )
}