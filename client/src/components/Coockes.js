import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { Close } from "../assets/display/Svg";
import Button from "./Button";

import { coockieFade } from "../FramerMotion";

const Coockes = () => {
    const [show, setShow] = useState(true);

    const accept = (e) => {
        e.preventDefault();
        setShow(false);
        localStorage.setItem("coockes", "accepted");
    };
    const reject = (e) => {
        e.preventDefault();
        setShow(false);
        localStorage.setItem("coockes", "rejected");
    };

    useLayoutEffect(() => {
        if (localStorage.getItem("coockes") === "accepted") {
            setShow(false);
        }
    }, [show]);

    return (
        <AnimatePresence key="coockie">
            {show && (
                <Container className={`component component-coockes`} initial="hidden" animate={show ? "visible" : "hidden"} exit="exit" variants={coockieFade}>
                    <Content>
                        <p>
                            We use cookies to offer you a better experience and analyze traffic. by continuing to use our website, you consent to the use of cookies in accordance to our <Link to="/privacy-policy">cookie policy</Link>.
                        </p>
                        <div className="group">
                            <div onClick={accept}>
                                <Button url="#" text="Got it" color="offWhite" bg="offWhite" style="outline" />
                            </div>
                            <Close onClick={reject} />
                        </div>
                    </Content>
                </Container>
            )}
        </AnimatePresence>
    );
};

export default Coockes;

const Container = styled(motion.section)`
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 100;
    bottom: 0;
    right: 0;
    background-color: ${({ theme }) => theme.color.blue};
    color: ${({ theme }) => theme.color.offWhite};
    max-width: 1200px;
`;

const Content = styled.section`
    display: grid;
    grid-template-columns: 2fr auto auto;
    grid-template-rows: auto;
    gap: 3rem;
    padding: 4rem 6rem;

    p {
        a {
            text-decoration: underline;
        }
    }
    a {
        color: ${({ theme }) => theme.color.offWhite};
    }

    svg {
        width: 64px;
        height: 64px;
    }
    .group {
        display: flex;
        justify-content: space-between;
        & > div {
            width: 100%;
            margin-right: 4rem;
        }
    }

    @media only screen and (max-width: 784px) {
        padding: 2rem;
        grid-template-columns: 1fr;
    }
`;
