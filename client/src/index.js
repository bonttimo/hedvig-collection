import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AnimatePresence } from "framer-motion";

import { GlobalStyles } from "./Globals";
import { theme } from "./theme";
import Layout from "./Layout";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import About from "./pages/About";
import PrivacyPolicy from "./pages/Privacy-policy";

const App = () => {
    const location = useLocation();

    useEffect(() => {
        console.log("rendered");
    });

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AnimatePresence exitBeforeEnter>
                <Layout key={location.pathname}>
                    <Routes location={location}>
                        <Route index path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    </Routes>
                </Layout>
            </AnimatePresence>
        </ThemeProvider>
    );
};

const root = createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
);
