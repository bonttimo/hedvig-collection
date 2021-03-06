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
                        <NavLink className={({ isActive }) => (isActive ? "active" : "") + " hoverUnderline"} to="/">
                            Home
                        </NavLink>
                        {/* <span>|</span> */}
                        <NavLink className={({ isActive }) => (isActive ? "active" : "") + " hoverUnderline"} to="/shop">
                            Shop
                        </NavLink>
                        <span>|</span>
                        <NavLink className={({ isActive }) => (isActive ? "active" : "") + " hoverUnderline"} to="/about">
                            About
                        </NavLink>
                    </div>
                    <div className="mobile">
                        <button onClick={mobileMenu}>{showMobileMenu ? "Close" : "Menu"}</button>
                    </div>
                </div>
                <NavLink to="/" alt="Back to frontpage">
                    <Logo />
                </NavLink>
                <div className="right">
                    <button className="cart" onClick={showCart}>
                        <p className="hoverUnderline">Bag</p>
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
                    <NavLink className={({ isActive }) => (isActive ? "active" : "") + " hoverUnderline"} to="/">
                        Home
                    </NavLink>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "") + " hoverUnderline"} to="/shop">
                        Shop
                    </NavLink>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "") + " hoverUnderline"} to="/about">
                        About
                    </NavLink>
                </motion.div>
            </div>
            <div className="group">
                <motion.div variants={mobileMenuSlide}>
                    <h6>Returns & Privacy</h6>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "") + " hoverUnderline"} to="/privacy-policy#shipping-privacy">
                        Refund Policy
                    </NavLink>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "") + " hoverUnderline"} to="/privacy-policy#pre-order">
                        Pre-Order
                    </NavLink>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "") + " hoverUnderline"} to="/privacy-policy#privacy-policy">
                        Privacy Policy
                    </NavLink>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "") + " hoverUnderline"} to="/privacy-policy#terms-of-service">
                        Terms of Service
                    </NavLink>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "") + " hoverUnderline"} to="/privacy-policy#shipping-and-deliveries">
                        Shipping & Deliveries
                    </NavLink>
                </motion.div>
            </div>
            <div className="group">
                <motion.div variants={mobileMenuSlide}>
                    <h6>Follow us</h6>
                </motion.div>
                <motion.div variants={mobileMenuSlide}>
                    <a className="hoverUnderline" href="https://www.instagram.com/hedvigcollection" target="_blank" rel="noreferrer">
                        Instagram
                    </a>
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
                <NavLink to="/" alt="Back to frontpage">
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
        max-width: 220px;
        fill: ${({ theme }) => theme.color.black};
    }

    @media only screen and (max-width: 784px) {
        svg {
            max-width: 120px;
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
    button,
    button p {
        font-size: var(--text-small);
        color: ${({ theme }) => theme.color.darkGray};
    }

    .mobile {
        display: none;
    }

    .hoverUnderline:after {
        background-color: ${({ theme }) => theme.color.darkGray};
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
    padding: 2rem var(--gutter);
    margin: 0 auto;

    .left,
    .right {
        display: flex;
        align-items: center;
        align-items: baseline;
        a {
            margin-right: 0.6rem;

            &:nth-child(2) {
                margin-right: 0;
            }
        }

        span {
            margin: 0 1.2rem;
        }

        a:last-of-type {
            margin-right: 0;
        }
        button {
            cursor: pointer;
            padding: 0;
        }
    }

    .left {
        span {
            justify-self: center;
        }
    }

    .right {
        justify-self: end;
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
        max-width: 220px;
        padding: 0 0.5rem;
    }

    @media only screen and (max-width: 784px) {
        padding: 1rem var(--gutter);
        svg {
            max-width: 120px;
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
        gap: 2rem;
    }
    h6 {
        text-transform: uppercase;
        color: ${({ theme }) => theme.color.gray};
        font-size: 1rem;
        font-family: var(--scto);
        font-size: var(--text-smaller);
    }

    a,
    button {
        font-size: var(--text-big);
        color: ${({ theme }) => theme.color.darkGray};
        font-family: var(--noeStandard);
    }
`;
