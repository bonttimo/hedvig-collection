import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, useViewportScroll } from "framer-motion";

import { BagContext } from "../context/BagContext";

import { navigationSlide, logoFade, mobileMenuSlide } from "../FramerMotion";
import { Logo } from "../assets/display/Svg";

const MenuBar = ({ showCart, navHidden, mobileMenu, showMobileMenu }) => {
    const { checkout } = useContext(BagContext);

    return (
        <Container className={`mainMenu ${showMobileMenu ? "mobile-open" : "mobile-closed"}`} initial="visible" animate={navHidden && !showMobileMenu ? "hidden" : "visible"} variants={navigationSlide}>
            <Content>
                <div className="left">
                    <div className="desktop">
                        <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/">
                            Home
                        </NavLink>
                        <span>|</span>
                        <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/shop">
                            Shop
                        </NavLink>
                        <span>|</span>
                        <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/about">
                            About
                        </NavLink>
                    </div>
                    <div className="mobile">
                        <button onClick={mobileMenu}>{showMobileMenu ? "Close" : "Menu"}</button>
                    </div>
                </div>
                <NavLink to="/">
                    <Logo />
                </NavLink>
                <div className="right">
                    <button className="cart" onClick={showCart}>
                        Bag
                        <span className="cartAmount">{checkout.lineItems && checkout.lineItems.length > 0 ? checkout.lineItems.length : 0}</span>
                    </button>
                </div>
            </Content>
        </Container>
    );
};

const Mobile = () => {
    return (
        <div className="content">
            <div className="group">
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/">
                        Home
                    </NavLink>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/shop">
                        Shop
                    </NavLink>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/about">
                        About
                    </NavLink>
                </motion.div>
            </div>
            <div className="group">
                <motion.div variants={mobileMenuSlide}>
                    <h6>Returns & Privacy</h6>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/privacy-policy#shipping-privacy">
                        Refund Policy
                    </NavLink>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/privacy-policy#pre-order">
                        Pre-Order
                    </NavLink>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/privacy-policy#privacy-policy">
                        Privacy Policy
                    </NavLink>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/privacy-policy#terms-of-service">
                        Terms of Service
                    </NavLink>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/privacy-policy#shipping-and-deliveries">
                        Shipping & Deliveries
                    </NavLink>
                </motion.div>
            </div>
            <div className="group">
                <motion.div variants={mobileMenuSlide}>
                    <h6>Follow us</h6>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <a href="https://www.google.com/">Instagram</a>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <a href="https://www.google.com/">Pinterest</a>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <a href="https://www.google.com/">Linkedin</a>
                </motion.div>
            </div>
        </div>
    );
};

const Navigation = () => {
    const { showCart, isCartOpen } = useContext(BagContext);
    const location = useLocation();
    const [navHidden, setNavHidden] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [offset, setOffset] = useState(null);

    const { scrollY } = useViewportScroll();

    const scrollDirection = () => {
        if (scrollY.current > scrollY.prev && scrollY.current > 224) {
            setNavHidden(true);
        } else if (scrollY.current < scrollY.prev) {
            setNavHidden(false);
        }
    };

    const mobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    useEffect(() => {
        scrollY.onChange(() => scrollDirection());
        setShowMobileMenu(false);
    }, [isCartOpen, location]);

    useLayoutEffect(() => {
        setOffset(document.querySelector(".mainMenu").getBoundingClientRect().height);
    }, []);

    return (
        <>
            <MenuBar showCart={showCart} navHidden={navHidden} mobileMenu={mobileMenu} showMobileMenu={showMobileMenu} />
            <MobileMenu offset={offset} initial="hidden" animate={showMobileMenu ? "visible" : "hidden"} exit="exit" variants={mobileMenuSlide} style={{ pointerEvents: showMobileMenu ? "all" : "none" }}>
                <Mobile showMobileMenu={showMobileMenu} />
            </MobileMenu>
            <SmallLogo initial="visible" animate={navHidden ? "visible" : "hidden"} variants={logoFade}>
                <NavLink to="/">
                    <Logo />
                </NavLink>
            </SmallLogo>
        </>
    );
};

export default Navigation;

const SmallLogo = styled(motion.section)`
    display: flex;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    position: fixed;
    z-index: 20;
    padding: 1.5rem;
    svg {
        width: 100%;
        max-width: 200px;
        fill: ${({ theme }) => theme.color.black};
    }

    @media only screen and (max-width: 784px) {
        svg {
            max-width: 150px;
        }
    }
`;

const Container = styled(motion.nav)`
    width: 100%;
    height: auto;
    position: fixed;
    background-color: ${({ theme }) => theme.color.white};
    z-index: 999;
    color: ${({ theme }) => theme.color.darkGray};

    a,
    button {
        color: ${({ theme }) => theme.color.darkGray};
    }
    .mobile {
        display: none;
    }
    @media only screen and (max-width: 784px) {
        .desktop {
            display: none;
        }
        .mobile {
            display: grid;
        }
    }
`;

const Content = styled.section`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-auto-rows: auto;
    align-items: center;
    max-width: var(--maxWidth);
    padding: 1.5rem var(--gutter);
    margin: 0 auto;

    .left,
    .right {
        display: flex;
        align-items: center;
        align-items: baseline;
        a,
        span {
            margin-right: 1rem;
        }

        a:last-of-type {
            margin-right: 0;
        }
        button {
            cursor: pointer;
        }
    }

    .left {
        span {
            justify-self: center;
        }
    }

    .right {
        justify-self: end;

        button {
            margin-left: 1rem;
        }
    }

    .cart {
        cursor: pointer;
        span {
            margin-left: 1rem;
            margin-right: 0;
            padding: 0.8rem;
            background-color: ${({ theme }) => theme.color.lightGray};
        }
    }

    svg {
        max-width: 200px;
        padding: 0 1rem;
    }

    @media only screen and (max-width: 784px) {
        padding: 1rem;
        svg {
            max-width: 150px;
        }
    }
`;

const MobileMenu = styled(motion.nav)`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    align-items: start;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: fixed;
    overflow-y: auto;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.color.white};
    z-index: 50;

    .content {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: auto;
        align-items: start;
        align-content: center;
        gap: 3rem;
        margin-top: ${({ offset }) => `${offset + 30}px`};
        margin-bottom: 6rem;
    }
    .group {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: auto;
        justify-items: center;
        gap: 1rem;
    }
    h6 {
        color: ${({ theme }) => theme.color.gray};
    }
`;
