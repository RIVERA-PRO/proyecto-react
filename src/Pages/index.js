
import IndexLayout from "../Layouts/IndexLayout";
import MainLayout from "../Layouts/MainLayout";

import { createBrowserRouter } from "react-router-dom";
import Details from './Details/Details'
export const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexLayout />,

    },
    {
        path: "/",
        element: <MainLayout />,
        children: [

            {
                path: "/details/:id",
                element: <Details />,
            },
        ],
    },
]);
