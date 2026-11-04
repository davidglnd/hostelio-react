import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface ExpensesFiltersProps {
    paymentStatusFilter: "all" | "pending" | "paid",
    changePaymentStatusFilter: (statusFilter: "all" | "pending" | "paid") => void;
}
export const ExpensesFilters = ({ paymentStatusFilter, changePaymentStatusFilter }: ExpensesFiltersProps) => {
    return (
        <div>
            <div>
                <p>Estado de pago</p>
                <nav>
                    <ToggleGroup value={[paymentStatusFilter]} onValueChange={
                        (values) => {
                            if (values.length > 0) {
                                changePaymentStatusFilter(values[0] as "all" | "pending" | "paid")
                            }
                        }
                    }
                    >
                        <ToggleGroupItem value="all">Todos</ToggleGroupItem>
                        <ToggleGroupItem value="paid">Pagados</ToggleGroupItem>
                        <ToggleGroupItem value="pending">Pendientes</ToggleGroupItem>
                    </ToggleGroup>
                </nav>
            </div>
        </div>
    )
}