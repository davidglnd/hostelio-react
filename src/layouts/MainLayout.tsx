import { Outlet } from "react-router"

import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"

export const MainLayout = () => {

    return (
        <>
            <div className="flex flex-col w-full h-screen">
                <Header></Header>
                <div className="flex flex-1">
                    <Sidebar></Sidebar>
                    <main className="flex-1 bg-gray-950 text-gray-50">
                        <Outlet />
                    </main>
                </div>
            </div>

        </>
    )
}