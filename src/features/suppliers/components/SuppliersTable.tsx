import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { EllipsisVertical, Pencil, UserX, UserCheck } from "lucide-react";

import type { Supplier } from "../types/supplier.types";

interface SuppliersTableProps {
    suppliers: Supplier[];
}
export const SuppliersTable = (data: SuppliersTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="text-gray-300">Proveedor</TableHead>
                    <TableHead className="text-gray-300">Teléfono</TableHead>
                    <TableHead className="text-gray-300">Email</TableHead>
                    <TableHead className="text-gray-300">Estado</TableHead>
                    <TableHead className="text-gray-300">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.suppliers.map((supplier) =>
                        <TableRow key={supplier.id} className="hover:bg-transparent">
                            <TableCell>{supplier.name}</TableCell>
                            <TableCell>{supplier.phone || "—"}</TableCell>
                            <TableCell>{supplier.email || "—"}</TableCell>
                            <TableCell>
                                <Badge className={supplier.isActive
                                    ? "bg-green-400 text-gray-950"
                                    : "bg-red-400 text-gray-950"}>
                                    {supplier.isActive ? "Activo" : "Inactivo"}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        render={<Button variant="ghost" size="icon" aria-label={`Acciones de ${supplier.name}`} className="cursor-pointer" />}
                                    >
                                        <EllipsisVertical className="text-gray-300" />
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                        align="end"
                                        className="bg-gray-800 border-gray-700 text-gray-50 "
                                    >
                                        <DropdownMenuItem className="focus:bg-gray-700 focus:text-gray-50  hover:cursor-pointer ">
                                            <Pencil />
                                            Editar
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="focus:bg-gray-700 focus:text-gray-50  hover:cursor-pointer">
                                            {supplier.isActive ? <UserX /> : <UserCheck />}
                                            {supplier.isActive ? "Desactivar" : "Activar"}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    );
};