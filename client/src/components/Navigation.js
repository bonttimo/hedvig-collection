import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { motion, useViewportScroll } from "framer-motion";

import { BagContext } from "../context/BagContext";

import { navigationSlide, logoFade } from "../FramerMotion";
import { Logo } from "../assets/display/Svg";

const Navigation = () => {
    const { showBag, bagIsOpen } = useContext(BagContext);

    const { scrollY } = useViewportScroll();
    const [navHidden, setNavHidden] = useState(false);

    const scrollDirection = () => {
        if (scrollY.current > scrollY.prev && scrollY.current > 224) {
            setNavHidden(true);
        } else if (scrollY.current < scrollY.prev) {
            setNavHidden(false);
        }
    };

    const bag = () => {
        showBag();
        document.body.classList.toggle("bag-open");
    };

    useEffect(() => {
        scrollY.onChange(() => scrollDirection());
    }, [bagIsOpen]);

    return (
        <>
            <Container className="mainMenu" initial="visible" animate={navHidden ? "hidden" : "visible"} variants={navigationSlide}>
                <Content>
                    <div className="left">
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
                    <NavLink to="/">
                        <Logo />
                    </NavLink>
                    <div className="right">
                        <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/login">
                            Login
                        </NavLink>
                        <button className="cart" onClick={bag}>
                            Bag
                            <span className="cartAmount">0</span>
                        </button>
                    </div>
                </Content>
            </Container>
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
    z-index: 99;
    padding: 1.5rem;
    svg {
        width: 100%;
        max-width: 200px;
        fill: ${({ theme }) => theme.color.black};
    }
`;

const Container = styled(motion.nav)`
    width: 100%;
    height: auto;
    position: fixed;
    background-color: ${({ theme }) => theme.color.white};
    z-index: 999;
    color: ${({ theme }) => theme.color.gray};

    /* @media only screen and (min-width: 850px) {
		padding: 5rem ${({ theme }) => theme.layout.gutter};
	} */
`;

const Content = styled.section`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-auto-rows: auto;
    align-items: center;
    max-width: ${({ theme }) => theme.layout.maxWidth};
    padding: 1.5rem ${({ theme }) => theme.layout.gutter};
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
`;
