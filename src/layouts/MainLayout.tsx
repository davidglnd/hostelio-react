import { useState } from "react"
import { Outlet } from "react-router"

import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"

export const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col w-full h-screen">
                <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                {isSidebarOpen && (
                    <div
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    />
                )}
                <div className="flex flex-1">
                    <Sidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />
                    <main className="flex-1 min-w-0 bg-gray-950 text-gray-50">
                        <Outlet />
                    </main>
                </div>
            </div>

        </>
    )
}