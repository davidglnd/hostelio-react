import { ChartNoAxesCombined, Clock, NotepadText, ReceiptEuro } from "lucide-react"

import { SummaryCard } from "@/components/SummaryCard"

export const HomePage = () => {
    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-50">Resumen del negocio</h1>
                <p className="text-gray-400 text-sm">Aquí tienes un resumen de la actividad de tu establecimiento.</p>
            </div>
            <div className="h-px bg-gray-700" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <SummaryCard title="Gastos del mes" value="2000 €" description="Total registrado" icon={ReceiptEuro} />
                <SummaryCard title="Pendiente de pago" value="0€" description="Facturas pendientes" icon={Clock} />
                <SummaryCard title="Gastos registrados" value="40" description="Durante este mes" icon={NotepadText} />
                <SummaryCard title="Comparativa mensual" value="10" description="Frente al mes anterior" trend="up" icon={ChartNoAxesCombined} />
            </div>
            <div className="h-px bg-gray-700" />
        </div>
    )
}