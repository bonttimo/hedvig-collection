import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AnimatePresence } from "framer-motion";

import { GlobalStyles } from "./Globals";
import { theme } from "./theme";
import Layout from "./Layout";

import { BagProvider } from "./context/BagContext";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import About from "./pages/About";
import PrivacyPolicy from "./pages/Privacy-policy";

// import designOverlay from "./functions/designOverlay";

// import shopImg from "./shop.jpg";
// import frontpage from "./frontpage.jpg";
// import product from "./product.jpg";
// import product2 from "./product2.jpg";
// import about from "./about.jpg";
// import policy from "./policy.jpg";
// import cart from "./cart.jpg";

const App = () => {
    const location = useLocation();

    useEffect(() => {
        // console.log("rendered");
    });

    // useEffect(() => {
    //     const _designOverlay = new designOverlay({
    //         initial: {
    //             active: false,
    //             initial: "hidden",
    //             opacity: 0.6,
    //             fullWidth: false,
    //         },
    //         backgroundColor: "#000",
    //         maxWidth: "1728px",
    //         images: [
    //             {
    //                 url: "/",
    //                 image: frontpage,
    //             },
    //             {
    //                 url: "/shop",
    //                 image: shopImg,
    //             },
    //             {
    //                 url: "/product*",
    //                 image: product,
    //             },
    //             {
    //                 url: "/about",
    //                 image: about,
    //             },
    //             {
    //                 url: "/cart",
    //                 image: cart,
    //             },
    //             {
    //                 url: "/privacy*",
    //                 image: policy,
    //             },
    //         ],
    //     });
    //     return () => _designOverlay.destroy();
    // }, [location]);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AnimatePresence exitBeforeEnter>
                <Layout key={location.pathname}>
                    <Routes location={location}>
                        <Route index path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/cart" element={<Cart />} />
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
        <BagProvider>
            <App />
        </BagProvider>
    </BrowserRouter>,
);
