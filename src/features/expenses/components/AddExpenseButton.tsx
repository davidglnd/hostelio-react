import { Button } from "@/components/ui/button"
import { useGlobalActions } from "@/hooks/useGlobalActions"
import { Plus } from "lucide-react"

export const AddExpenseButton = () => {
    const { openNewExpense } = useGlobalActions()
    return (
        <Button variant="standard" onClick={openNewExpense}>
            <Plus size={18} />
            Añadir gasto
        </Button>
    )
}