import { createContext } from "react";
import type { Expense } from "../types/expense.types";

interface ExpensesContextValue {
    //estado
    expenses: Expense[];

    //metodos
    addExpense: (expense: Expense) => void
}

export const ExpensesContext = createContext<ExpensesContextValue | undefined>(undefined);