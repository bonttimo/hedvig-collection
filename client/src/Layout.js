import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { pageTransition } from "./FramerMotion";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Bag from "./components/Bag";
import Coockes from "./components/Coockes";

const Layout = ({ children }) => {
    const location = useLocation();
    const pages = ["/", "product"];
    const [offset, setOffset] = useState(null);

    const onAnimationComplete = () => {
        if (location.hash === "") window.scrollTo({ top: 0, behavior: "smooth" });
        console.log("Animation complete");
    };

    useLayoutEffect(() => {
        setOffset(document.querySelector(".mainMenu").getBoundingClientRect().height);
    }, [location.pathname]);

    const debounce = (cb, delay = 1000) => {
        let timeout;

        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                cb(...args);
            }, delay);
        };
    };

    const debounceFunc = debounce(() => setOffset(document.querySelector(".mainMenu").getBoundingClientRect().height), 200);
    window.addEventListener("resize", () => debounceFunc());

    return (
        <Page initial="enter" animate="animate" exit="exit" variants={pageTransition} onAnimationComplete={onAnimationComplete}>
            <Navigation />
            <Bag />
            <Main currentPage={location.pathname} pages={pages} offset={offset}>
                <div className="page">{children}</div>
            </Main>
            <Footer />
            <Coockes />
        </Page>
    );
};

const Page = styled(motion.section)`
    background-color: ${({ theme }) => theme.color.offWhite};
`;

const Main = styled.main`
    transition: all ease 500ms;
    /* padding-top: ${({ currentPage, pages, offset }) => (pages.filter((page) => new RegExp(`^/+${page}.[0-9]*|\/$`).test(currentPage)).length <= 0 ? `${offset}px` : "0")}; */
    padding-top: ${({ currentPage, pages, offset }) => `${offset}px`};
    .page {
        height: auto;
        display: flex;
        flex-direction: column;
    }
`;

export default Layout;
