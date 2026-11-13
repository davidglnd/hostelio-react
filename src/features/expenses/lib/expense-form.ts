import type { Supplier } from "@/features/suppliers/types/supplier.types";
import type { FormErrors } from "@/types/form-errors.types";
import type { Expense } from "../types/expense.types";
type ExpenseValidationResult =
    | { success: false; errors: FormErrors<"amount" | "paymentStatus" | "supplierId" | "date" | "concept" | "category"> }
    | { success: true; data: Omit<Expense, "id"> };

export const readExpenseForm = (formData: FormData) => {
    const amount = Number(formData.get('amount'));
    const paymentStatus = formData.get('paymentStatus');
    const supplierId = String(formData.get('supplierId') ?? "").trim();
    const date = String(formData.get('date') ?? "").trim();
    const concept = String(formData.get('concept') ?? "").trim();
    const category = String(formData.get('category') ?? "").trim();

    return { amount, paymentStatus, supplierId, date, concept, category };
};

export const validateExpenseForm = (expenseFormValues: ReturnType<typeof readExpenseForm>, suppliers: Supplier[]): ExpenseValidationResult => {
    const errors: FormErrors<"amount" | "paymentStatus" | "supplierId" | "date" | "concept" | "category"> = { fields: {} };

    const supplierExists = suppliers.some((supplier) => supplier.id === expenseFormValues.supplierId);
    const amount = expenseFormValues.amount;
    const paymentStatus = expenseFormValues.paymentStatus;
    const date = expenseFormValues.date;
    const concept = expenseFormValues.concept;
    const category = expenseFormValues.category;

    if (!supplierExists) errors.fields.supplierId = "El proveedor no existe";
    if (!Number.isFinite(amount) || amount <= 0) errors.fields.amount = "El importe debe ser un número mayor que cero";
    if (paymentStatus !== "pending" && paymentStatus !== "paid") errors.fields.paymentStatus = "El estado de pago debe ser 'pendiente' o 'pagado'";
    if (!date) errors.fields.date = "La fecha no puede estar vacía";
    if (!concept) errors.fields.concept = "El concepto no puede estar vacío";
    if (!category) errors.fields.category = "La categoría no puede estar vacía";

    if (Object.keys(errors.fields).length > 0 || (paymentStatus !== "pending" && paymentStatus !== "paid")) return {
        success: false,
        errors,
    };
    return {
        success: true,
        data: {
            supplierId: expenseFormValues.supplierId,
            amount: expenseFormValues.amount,
            date: expenseFormValues.date,
            concept: expenseFormValues.concept,
            category: expenseFormValues.category,
            paymentStatus: paymentStatus,
        }
    };
};