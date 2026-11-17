import { useState, type PropsWithChildren } from "react"
import { GlobalActionsContext } from "./global-actions.context";
import { ExpensesFormDialog } from "@/features/expenses/components/ExpensesFormDialog";

import { mockSuppliers } from "@/features/suppliers/data/mockSuppliers";

import { useExpenses } from "@/features/expenses/hooks/useExpenses";

export const GlobalActionsProvider = ({ children }: PropsWithChildren) => {
    const [activeDialog, setActiveDialog] = useState<"newExpense" | null>(null);

    const { addExpense } = useExpenses();

    const activeSuppliers = mockSuppliers.filter((supplier) => supplier.isActive);

    function openNewExpense() {
        setActiveDialog("newExpense");
    }

    function closeDialog() {
        setActiveDialog(null);
    }
    return (
        <GlobalActionsContext value={{
            activeDialog: activeDialog,
            openNewExpense: openNewExpense,
            closeDialog: closeDialog,
        }}>
            {children}
            <ExpensesFormDialog openDialog={activeDialog === "newExpense"} onClose={closeDialog} onSave={addExpense} suppliers={activeSuppliers} />
        </GlobalActionsContext>
    )
}