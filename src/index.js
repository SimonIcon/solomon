import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage";
import './index.css'
import AuthPage from "./pages/AuthPage";
import Login from "./components/Login";
import Register from "./components/Register";
import RecoverPassword from "./components/RecoverPassword";
import ProductsPage from "./pages/ProductsPage";
import AddProducts from "./pages/AddProducts";
import ProductInfoPage from "./pages/ProductInfoPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Homepage />,

            },
            {
                path: "/auth",
                element: <AuthPage />,
                children: [
                    {
                        path: "/auth",
                        element: <Login />
                    },
                    {
                        path: "/auth/register",
                        element: <Register />,
                    },
                    {
                        path: "/auth/recover",
                        element: <RecoverPassword />
                    }
                ]

            },
            {
                path: "/products",
                element: <ProductsPage />
            },
            {
                path: "/addProducts",
                element: <AddProducts />
            },
            {
                path: "/productInfo",
                element: <ProductInfoPage />
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
