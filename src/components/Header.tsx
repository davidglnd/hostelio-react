import { Bell, Hamburger, Store, UserRound } from "lucide-react"

export const Header = () => {
    return (
        <div className="w-full bg-gray-900 flex flex-col ">
            <div className="flex flex-row gap-2 items-center p-2">
                <div className="bg-gray-700 rounded-md p-2">
                    <Hamburger className="text-amber-400" />
                </div>

                <div className="flex flex-col">
                    <p className="font-bold text-2xl text-gray-50">Hostelio</p>
                    <p className="text-sm text-gray-400">Gestiona tu negocio</p>
                </div>
                <div className="flex flex-row gap-2 items-center p-2 ml-auto">
                    <div className="bg-gray-700 rounded-md p-2">
                        <Bell className="text-gray-400" />
                    </div>

                    <div className="bg-gray-700 rounded-full p-2">
                        <UserRound className="text-gray-50" />
                    </div>
                </div>
            </div>
            <div className="h-px bg-gray-700" />
            <div className="flex flex-row gap-2 items-center p-2 ">
                <div className="flex gap-2 text-sm">
                    <Store className="text-gray-400" />
                    <p className="text-sm text-gray-200">Nombre establecimiento</p>
                </div>
                <div className="flex flex-row items-center ml-auto ">
                    <p className="text-sm p-1 text-green-900 bg-green-300 rounded-full">Admin</p>
                </div>
            </div>
            <div className="h-px bg-gray-700" />
        </div>
    )
}