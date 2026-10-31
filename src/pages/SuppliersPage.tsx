import { useState } from "react";

import { Input } from "@/components/ui/input";

import { SuppliersFormDialog } from "@/features/suppliers/components/SuppliersFormDialog";
import { SuppliersTable } from "@/features/suppliers/components/SuppliersTable";

import { Search } from "lucide-react";

import { mockSuppliers } from "@/features/suppliers/data/mockSuppliers";
import type { Supplier } from "@/features/suppliers/types/supplier.types";

export const SuppliersPage = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
    const [searchTerm, setSearchTerm] = useState("");
    const handleAddSupplier = (newSupplier: Supplier) => {
        setSuppliers((prevSuppliers) => [...prevSuppliers, newSupplier]);
    };
    const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
    const toggleState = (id: string) => {
        const newSuppliers = suppliers.map((supplier) => {
            return supplier.id === id
                ? { ...supplier, isActive: !supplier.isActive }
                : supplier
        }
        )
        setSuppliers(newSuppliers);
    }

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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}

                    />
                </div>
                <SuppliersFormDialog handleAddSupplier={handleAddSupplier} />

            </div>
            {
                suppliers.length === 0
                    ? <p className="text-gray-400">No hay proveedores añadidos aún.</p>
                    : filteredSuppliers.length === 0
                        ? <p className="text-gray-400">No hay proveedores relacionados con tu búsqueda.</p>
                        : <SuppliersTable suppliers={filteredSuppliers} toggleState={toggleState} />
            }
        </div>
    )
}