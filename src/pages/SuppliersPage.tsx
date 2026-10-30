import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SuppliersFormDialog } from "@/features/suppliers/components/SuppliersFormDialog";
import { SuppliersTable } from "@/features/suppliers/components/SuppliersTable";

import { Plus, Search } from "lucide-react";

import { mockSuppliers } from "@/features/suppliers/data/mockSuppliers";
import type { Supplier } from "@/features/suppliers/types/supplier.types";

export const SuppliersPage = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
    const handleAddSupplier = (newSupplier: Supplier) => {
        setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);
    };
    return (
        <div className="p-8 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-50">Proveedores</h1>
                <p className="text-gray-400 text-sm">Gestiona los proveedores de tu negocio.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                        placeholder="Buscar proveedor..."
                        className="pl-10 "
                    />
                </div>
                {/* <Button className="bg-amber-400 text-gray-900 hover:bg-amber-500">
                    <Plus size={18} />
                    Nuevo proveedor
                </Button> */}
                <SuppliersFormDialog handleAddSupplier={handleAddSupplier} />
            </div>
            <SuppliersTable suppliers={suppliers} />
        </div>
    )
}