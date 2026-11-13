import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import type { Expense } from "../types/expense.types";


interface ExpensesTableProps {
    expensesData: (Expense & { supplierName: string })[];
}

export const ExpensesTable = ({ expensesData }: ExpensesTableProps) => {
    return (
        <Table className="bg-gray-800 rounded-2xl text-gray-950">
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="text-gray-300">Proveedor</TableHead>
                    <TableHead className="text-gray-300">Importe</TableHead>
                    <TableHead className="text-gray-300">Fecha</TableHead>
                    <TableHead className="text-gray-300">Concepto</TableHead>
                    <TableHead className="text-gray-300">Categoría</TableHead>
                    <TableHead className="text-gray-300">Estado</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    expensesData.map((expense) => {
                        return (
                            <TableRow key={expense.id} className="hover:bg-transparent">
                                <TableCell className="text-gray-300">{expense.supplierName}</TableCell>
                                <TableCell className="text-gray-300">{new Intl.NumberFormat(
                                    "es-ES", { style: "currency", currency: "EUR" }).format(expense.amount

                                    )}
                                </TableCell>
                                <TableCell className="text-gray-300">{new Date(expense.date).toLocaleDateString('es-ES')}</TableCell>
                                <TableCell className="text-gray-300">{expense.concept}</TableCell>
                                <TableCell className="text-gray-300">{expense.category}</TableCell>
                                <TableCell className="text-gray-300"><Badge className={
                                    expense.paymentStatus === "paid"
                                        ? "bg-green-400 text-gray-950"
                                        : "bg-red-400 text-gray-950"
                                }>
                                    {
                                        expense.paymentStatus === "paid"
                                            ? "Pagado"
                                            : "Pendiente"
                                    }
                                </Badge>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}