import { ChartNoAxesCombined, Clock, NotepadText, ReceiptEuro } from "lucide-react"

import { SummaryCard } from "@/features/dashboard/components/SummaryCard"
import { RecentActivity } from "@/features/dashboard/components/RecentActivity"
import { TopSuppliers } from "@/features/dashboard/components/TopSuppliers"

import { mockSuppliers } from "@/features/suppliers/data/mockSuppliers"
import { mockExpenses } from "@/features/expenses/data/mockExpenses"

export const HomePage = () => {
    const mockAmount = 10000;
    const expensesData = [...mockExpenses];
    const suppliersData = mockSuppliers;
    /*Recent activity*/
    const orderedExpenses = expensesData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
    }).slice(0, 5);
    const recentExpenses = orderedExpenses.map((expense) => ({
        ...expense,
        supplierName: suppliersData.find((supplier) => supplier.id === expense.supplierId)?.name ?? "Proveedor desconocido",
    }));
    /*Top suppliers*/
    const date = new Date();
    const currentMonthExpenses = expensesData.filter((expense) => new Date(expense.date).getMonth() === date.getMonth()
        && new Date(expense.date).getFullYear() === date.getFullYear());

    const totalsBySupplier = currentMonthExpenses.reduce<Record<string, number>>(
        (acc, expense) => {
            acc[expense.supplierId] =
                (acc[expense.supplierId] ?? 0) + expense.amount;

            return acc;
        },
        {}
    );
    const supplierTotals = Object.entries(totalsBySupplier).map(([supplierId, total]) => {
        return {
            supplierId: supplierId,
            totalAmount: total,
            supplierName: suppliersData.find((supplier) => supplierId === supplier.id)?.name ?? "Proveedor desconocido",
        }
    });
    const topSuppliers = supplierTotals.sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 5);
    /*Utils */
    const monthlyTotal = currentMonthExpenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-50">Resumen del negocio</h1>
                <p className="text-gray-400 text-sm">Aquí tienes un resumen de la actividad de tu establecimiento.</p>
            </div>
            <div className="h-px bg-gray-700" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <SummaryCard title="Gastos del mes" value={new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(mockAmount)} description="Total registrado" icon={ReceiptEuro} />
                <SummaryCard title="Pendiente de pago" value="0€" description="Gastos pendientes" icon={Clock} />
                <SummaryCard title="Gastos registrados" value="40" description="Durante este mes" icon={NotepadText} />
                <SummaryCard title="Comparativa mensual" value="10" description="Frente al mes anterior" trend="up" icon={ChartNoAxesCombined} />
            </div>
            <div className="h-px bg-gray-700" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentActivity expensesData={recentExpenses} />
                </div>
                <div>
                    <TopSuppliers topSuppliers={topSuppliers} monthlyTotal={monthlyTotal} />
                </div>
            </div>
        </div>
    )
}