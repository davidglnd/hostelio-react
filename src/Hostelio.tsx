import { router } from "./router/app.router"

import { RouterProvider } from "react-router"

export const Hostelio = () => {
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}