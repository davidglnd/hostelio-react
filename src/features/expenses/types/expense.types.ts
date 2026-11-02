export interface Expense {
    id: string,
    supplierId: string,
    amount: number,
    date: string,
    concept: string,
    category: string,
    paymentStatus: "pending" | "paid",
}