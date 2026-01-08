import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CreateVacancy from "../pages/CreateVacancy";
import Jobs from "../pages/Jobs";


export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: '/', element:<Home />},
            { path: '/publish', element: <CreateVacancy />},
            { path: '/jobs', element: <Jobs />}
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