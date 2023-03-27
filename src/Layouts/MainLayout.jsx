import React from "react";
import Header from "../Pages/Header/Header";
import Footer from "../Pages/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function () {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
