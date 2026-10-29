import { createBrowserRouter } from "react-router";

import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { SettingsPage } from "@/pages/SettingsPage";
import { ExpensesPage } from "@/pages/ExpensesPage";
import { CashRegisterPage } from "@/pages/CashRegisterPage";
import { SuppliersPage } from "@/pages/SuppliersPage";
import { EmployeesPage } from "@/pages/EmployeesPage";
import { CostingsPage } from "@/pages/CostingsPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'gastos',
                element: <ExpensesPage />
            },
            {
                path: 'cajas',
                element: <CashRegisterPage />
            },
            {
                path: 'proveedores',
                element: <SuppliersPage />
            },
            {
                path: 'empleados',
                element: <EmployeesPage />
            },
            {
                path: 'escandallos',
                element: <CostingsPage />
            },
            {
                path: 'configuracion',
                element: <SettingsPage />
            }

        ]
    },
])