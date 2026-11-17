import { useState, type PropsWithChildren } from "react"
import { ExpensesContext } from "./expenses.context"
import { mockExpenses } from "../data/mockExpenses"
import type { Expense } from "../types/expense.types"

export const ExpensesProvider = ({ children }: PropsWithChildren) => {
    const [expenses, setExpenses] = useState(mockExpenses)
    function addExpense(newExpense: Expense) {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }
    function updatePaymentStatus(expenseId: string) {
        const editedPaymentStatusExpenses = expenses.map<Expense>((expense) => {
            return expense.id === expenseId
                ? { ...expense, paymentStatus: expense.paymentStatus === "pending" ? "paid" : "pending" }
                : expense
        })
        setExpenses(editedPaymentStatusExpenses);
    }
    return (
        <ExpensesContext value={{
            expenses: expenses,
            addExpense: addExpense,
            updatePaymentStatus: updatePaymentStatus,
        }}>
            {children}
        </ExpensesContext>
    )
}