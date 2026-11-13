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
import { useState, type FormEvent } from "react";
import type { Expense } from "../types/expense.types";
import { readExpenseForm, validateExpenseForm } from "../lib/expense-form";
import type { FormErrors } from "@/types/form-errors.types";
interface ExpensesFormDialogProps {
    openDialog: boolean,
    suppliers: Supplier[],
    onClose: () => void,
    onSave: (expense: Expense) => void
}

export const ExpensesFormDialog = ({ openDialog, onClose, suppliers, onSave }: ExpensesFormDialogProps) => {
    const [errors, setErrors] = useState<FormErrors<"amount" | "paymentStatus" | "supplierId" | "date" | "concept" | "category">>({ fields: {} });
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const readExpenseFormResult = readExpenseForm(formData);
        const validationResult = validateExpenseForm(readExpenseFormResult, suppliers);

        if (validationResult.success === false) {
            setErrors(validationResult.errors);
            return;
        } else {
            setErrors({ fields: {} });
            const newExpense: Expense = {
                id: crypto.randomUUID(),
                ...validationResult.data
            }
            onSave(newExpense);
            handleClose();
        }
    };

    const handleClose = () => {
        setErrors({ fields: {} });
        onClose();
    };

    return (
        <Dialog open={openDialog} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="bg-gray-800 border-gray-700 text-gray-50">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
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
                            {
                                errors.fields.supplierId &&
                                <p className="text-xs text-red-400">{errors.fields.supplierId}</p>
                            }
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="expense-concept">Concepto *</Label>
                            <Input
                                className={errors.fields.concept ? "border-red-400" : ""}
                                id="expense-concept"
                                name="concept"
                                placeholder="Ej. Compra de bebidas"
                                required
                            />
                            {
                                errors.fields.concept &&
                                <p className="text-xs text-red-400">{errors.fields.concept}</p>
                            }
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expense-amount">Importe (€) *</Label>
                            <Input
                                className={errors.fields.amount ? "border-red-400" : ""}
                                id="expense-amount"
                                name="amount"
                                type="number"
                                min="0.01"
                                step="0.01"
                                placeholder="0,00"
                                required
                            />
                            {
                                errors.fields.amount &&
                                <p className="text-xs text-red-400">{errors.fields.amount}</p>
                            }
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expense-date">Fecha *</Label>
                            <Input
                                className={errors.fields.date ? "border-red-400" : ""}
                                id="expense-date"
                                name="date"
                                type="date"
                                required
                            />
                            {
                                errors.fields.date &&
                                <p className="text-xs text-red-400">{errors.fields.date}</p>
                            }
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expense-category">Categoría *</Label>
                            <Input
                                className={errors.fields.category ? "border-red-400" : ""}
                                id="expense-category"
                                name="category"
                                placeholder="Ej. Alimentación"
                                required
                            />
                            {
                                errors.fields.category &&
                                <p className="text-xs text-red-400">{errors.fields.category}</p>
                            }
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
                            {
                                errors.fields.paymentStatus &&
                                <p className="text-xs text-red-400">{errors.fields.paymentStatus}</p>
                            }
                        </div>
                    </div>
                    <DialogFooter className="bg-gray-800 border-gray-700 text-gray-50">
                        <Button type="submit" className="bg-gray-700 text-gray-50 hover:bg-gray-600" >Guardar</Button>
                        <DialogClose render={
                            <Button
                                variant="outline"
                                className="bg-transparent border-gray-600 
                                text-gray-200 hover:bg-gray-700 hover:text-white hover:cursor-pointer"
                            />

                        }>
                            Cancelar
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}