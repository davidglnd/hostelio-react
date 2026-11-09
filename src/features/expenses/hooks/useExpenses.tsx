import { useContext } from "react";
import { ExpensesContext } from "../context/expenses.context";

export const useExpenses = () => {
    const context = useContext(ExpensesContext);

    if (context === undefined) {
        throw new Error("useExpenses debe usarse dentro de ExpensesProvider");
    }
    return context;
}