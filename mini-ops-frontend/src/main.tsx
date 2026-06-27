import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import Authentication from "./components/Authentication.tsx";
import {Toaster} from "sonner";
import {AuthProvider} from "./contexts/AuthProvider.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
    },
    {
        path: "/login",
        element: <Authentication/>,
    },
]);
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <Toaster/>
            <RouterProvider router={router}/>
        </AuthProvider>
    </StrictMode>,
);
