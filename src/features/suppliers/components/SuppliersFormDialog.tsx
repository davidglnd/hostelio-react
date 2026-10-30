import { useState, type FormEvent } from "react";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Supplier } from "../types/supplier.types";

interface SuppliersFormDialogProps {
    handleAddSupplier: (supplier: Supplier) => void;
}
export const SuppliersFormDialog = ({ handleAddSupplier }: SuppliersFormDialogProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = String(formData.get('name') ?? "").trim()
        if (!name) {
            return;
        }
        const newSupplier: Supplier = {
            name: name,
            phone: String(formData.get('phone') ?? "").trim(),
            email: String(formData.get('email') ?? "").trim(),
            isActive: true,
            id: crypto.randomUUID(),
        }
        handleAddSupplier(newSupplier);
        setIsOpen(false)
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-gray-800 border-gray-700 text-gray-50">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle >Nuevo proveedor</DialogTitle>
                        <DialogDescription className="text-gray-400">Introduce los datos del proveedor que quieres añadir a tu negocio.</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="supplier-name">Nombre del proveedor *</Label>
                            <Input
                                id="supplier-name"
                                type="text"
                                name="name"
                                placeholder="Ej. Bebidas Granadinas"
                                required
                            />

                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="phone-name">Telefono del proveedor</Label>
                            <Input
                                id="phone-name"
                                type="tel"
                                name="phone"
                                placeholder="611 222 111"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email-name">Email del proveedor</Label>
                            <Input
                                id="email-name"
                                type="email"
                                name="email"
                                placeholder="ejemplo@ejemplo.com"
                            />
                        </div>

                    </div>
                    <DialogFooter className="bg-gray-800 border-gray-700 text-gray-50">
                        <DialogClose render={<Button variant="outline" className="bg-transparent border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white hover:cursor-pointer" />}>
                            Cancelar
                        </DialogClose>

                        <Button type="submit">
                            Guardar proveedor
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
            <DialogTrigger
                render={<Button variant="default" />}
            >
                Nuevo proveedor
            </DialogTrigger>
        </Dialog>
    )
}