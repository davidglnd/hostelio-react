import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Supplier } from "@/features/suppliers/types/supplier.types";
import type { FormEvent } from "react";
import type { Expense } from "../types/expense.types";
interface ExpensesFormDialogProps {
    openDialog: boolean,
    suppliers: Supplier[],
    onClose: () => void,
}

export const ExpensesFormDialog = ({ openDialog, onClose, suppliers }: ExpensesFormDialogProps) => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const amount = Number(formData.get('amount'));
        const validatedPaymentStatus = formData.get('paymentStatus');
        const supplierId = String(formData.get('supplierId') ?? "").trim();
        const date = String(formData.get('date') ?? "").trim();
        const concept = String(formData.get('concept') ?? "").trim();
        const category = String(formData.get('category') ?? "").trim();
        const supplierExists = suppliers.some((supplier) => supplier.id === supplierId);
        if (
            (validatedPaymentStatus === "paid" || validatedPaymentStatus === "pending")
            && Number.isFinite(amount) && amount > 0
            && supplierExists && date.length > 0 && concept.length > 0 && category.length > 0
        ) {
            const newExpense: Expense = {
                id: crypto.randomUUID(),
                supplierId: supplierId,
                amount: amount,
                date: date,
                concept: concept,
                category: category,
                paymentStatus: validatedPaymentStatus,
            }
            console.log(newExpense)


        }
    };

    return (
        <Dialog open={openDialog} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="bg-gray-800 border-gray-700 text-gray-50">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle>
                            Añade un nuevo gasto.
                        </DialogTitle>
                        <DialogDescription>
                            Rellena todos los campos obligatorios.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="expense-supplier">Proveedor *</Label>
                            <select
                                id="expense-supplier"
                                name="supplierId"
                                defaultValue=""
                                required
                                className="h-9 w-full rounded-lg border border-gray-600 bg-gray-800 px-3 text-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            >
                                <option value="" disabled>Selecciona un proveedor</option>
                                {
                                    suppliers.map((supplier) =>
                                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="expense-concept">Concepto *</Label>
                            <Input
                                id="expense-concept"
                                name="concept"
                                placeholder="Ej. Compra de bebidas"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expense-amount">Importe (€) *</Label>
                            <Input
                                id="expense-amount"
                                name="amount"
                                type="number"
                                min="0.01"
                                step="0.01"
                                placeholder="0,00"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expense-date">Fecha *</Label>
                            <Input
                                id="expense-date"
                                name="date"
                                type="date"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expense-category">Categoría *</Label>
                            <Input
                                id="expense-category"
                                name="category"
                                placeholder="Ej. Alimentación"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expense-status">Estado de pago *</Label>
                            <select
                                id="expense-status"
                                name="paymentStatus"
                                defaultValue="pending"
                                required
                                className="h-9 w-full rounded-lg border border-gray-600 bg-gray-800 px-3 text-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            >
                                <option value="pending">Pendiente</option>
                                <option value="paid">Pagado</option>
                            </select>
                        </div>
                    </div>
                    <DialogFooter className="bg-gray-800 border-gray-700 text-gray-50">
                        <Button type="submit" className="bg-gray-700 text-gray-50 hover:bg-gray-600" >Guardar</Button>
                        <DialogClose render={<Button variant="outline" className="bg-transparent border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white hover:cursor-pointer" />}>
                            Cancelar
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}