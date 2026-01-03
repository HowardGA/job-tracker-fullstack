import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";


export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: '/', element:<Home />}
        ]
    },
    {
        element: <AuthLayout />,
        children: [
            { path: '/login', element: <LoginPage />},
            { path: '/register', element: <RegisterPage />}
        ]
    },
    // { path: '*', element: <NotFound />}
])