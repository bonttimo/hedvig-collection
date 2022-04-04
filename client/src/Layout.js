import { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { pageTransition } from "./FramerMotion";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
    const location = useLocation();
    const pages = ["/"];

    const onAnimationComplete = () => {
        console.log("Animation complete");
    };

    return (
        <Page initial="enter" animate="animate" exit="exit" variants={pageTransition} onAnimationComplete={onAnimationComplete}>
            <Navigation />
            <Main currentPage={location.pathname} modifiers={pages}>
                <div className="page">{children}</div>
            </Main>
            <Footer />
        </Page>
    );
};

const Page = styled(motion.section)`
    background-color: ${({ theme }) => theme.color.offWhite};
`;

const Main = styled.main`
    transition: all ease 500ms;
    padding-top: ${({ currentPage, modifiers }) => (modifiers.includes(currentPage) ? "" : "200px")};
`;

export default Layout;
