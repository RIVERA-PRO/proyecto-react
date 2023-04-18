import React from "react";
import Header from "../Pages/Header/Header";
import Home from '../Pages/Hom/Home';
import Footer from '../Pages/Footer/Footer'
import Products from '../Pages/Products/Products';
import { Outlet } from "react-router-dom";

export default function IndexLayout() {
    return (
        <>
            <Header />
            <Home />
            <Products />
            <Footer />
            <Outlet />
        </>
    );
}
