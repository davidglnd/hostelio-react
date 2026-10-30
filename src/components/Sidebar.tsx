import { NavLink } from "react-router";
import { Calculator, House, ReceiptEuro, Settings, Users, Van, Wallet } from "lucide-react";


const buttonOptions = [
    { id: 'inicio', name: 'Inicio', icon: House, route: '/' },
    { id: 'gastos', name: 'Gastos', icon: ReceiptEuro, route: '/gastos' },
    { id: 'escandallos', name: 'Escandallos', icon: Calculator, route: '/escandallos' },
    { id: 'cajas', name: 'Cajas', icon: Wallet, route: '/cajas' },
    { id: 'proveedores', name: 'Proveedores', icon: Van, route: '/proveedores' },
    { id: 'empleados', name: 'Empleados', icon: Users, route: '/empleados' },

]

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}
export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {

    return (
        <div
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 flex flex-col transition-transform duration-300
                        ${isOpen ? "translate-x-0" : "-translate-x-full"}
                        md:static md:translate-x-0`}
        >
            <nav className="flex flex-col gap-3 justify-start p-2">
                {
                    buttonOptions.map((option) => (
                        <NavLink to={option.route} className={({ isActive }) =>
                            (isActive
                                ? "bg-red-800  text-gray-300"
                                : "bg-transparent  hover:bg-gray-700 hover:text-gray-100 "
                            )
                            + " text-gray-300 w-full justify-start transition-colors font-normal rounded-md cursor-pointer px-3 py-4 flex items-center gap-2 "
                        }
                            key={option.id} onClick={onClose}>
                            <option.icon />
                            {option.name}
                        </NavLink>
                    ))
                }
            </nav>
            <div className="h-px bg-gray-700 mx-2" />
            <nav className="flex flex-col gap-3 justify-start p-2 mt-auto">
                <div className="h-px bg-gray-700 mx-2" />
                <NavLink to="/configuracion" onClick={onClose} className={({ isActive }) =>
                    (isActive
                        ? "bg-red-800 text-gray-300"
                        : "bg-transparent text-gray-300 hover:bg-gray-700 hover:text-gray-100 "
                    )
                    + "w-full justify-start transition-colors font-normal rounded-md cursor-pointer px-2 py-3 flex flex-col items-center gap-2 "
                }
                >
                    <Settings />
                    Configuración
                </NavLink>
            </nav>

        </div>
    )
}