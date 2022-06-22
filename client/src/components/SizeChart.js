import ReactDOM from "react-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { Close } from "../assets/display/Svg";
import { sizeFade } from "../FramerMotion";

import sizeChart from "../assets/display/sizeChart.svg";

const SizeChart = ({ open, close }) => {
    return ReactDOM.createPortal(
        <>
            <AnimatePresence key="sizeChart">
                {open && (
                    <Container className={`component-sizeChart`} initial="hidden" animate={open ? "visible" : "hidden"} exit="exit" variants={sizeFade}>
                        <Content>
                            <Header>
                                <h6 className="scto">Size Chart</h6>
                                <Close onClick={close} />
                            </Header>
                            <img src={sizeChart} alt="Size guide" />
                        </Content>
                    </Container>
                )}
            </AnimatePresence>
        </>,
        document.getElementById("portal"),
    );
};

export default SizeChart;

const Container = styled(motion.section)`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 99999;
    opacity: 0;
    top: 0;
    left: 0;
    padding: 1rem;
    overflow-y: auto;

    &::before {
        display: block;
        height: 100%;
        width: 5vw;
        position: fixed;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), transparent);
        z-index: 10;
        top: 0;
        left: 0;
    }

    &::after {
        display: block;
        height: 100%;
        width: 5vw;
        position: fixed;
        background: linear-gradient(-90deg, rgba(255, 255, 255, 0.8), transparent);
        top: 0;
        right: 0;
    }

    @media only screen and (max-width: 784px) {
        align-items: flex-start;
        &::after,
        &::before {
            content: "";
        }
    }
`;

const Content = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    padding: 2rem;
    background-color: ${({ theme }) => theme.color.lightBlue};

    img {
        padding: 2rem 6rem;

        /* min-width: calc(100% - 10vw); */
        /* max-height: 80vh; */
        height: auto;
        margin: 0 5vw;
        object-fit: contain;
        user-select: none;
        min-width: 60vh;
        max-width: 1400px;
    }

    @media only screen and (max-width: 784px) {
        width: 100%;
        overflow-x: auto;
        margin: 1rem 0;
        align-items: flex-start;
        img {
            padding: 0;
        }
    }
`;

const Header = styled.header`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 3rem;

    svg {
        max-width: 64px;
        stroke: ${({ theme }) => theme.color.darkGray};
        cursor: pointer;
    }

    @media only screen and (max-width: 784px) {
        margin-bottom: 2rem;
        svg {
            max-width: 24px;
            position: fixed;
            right: 40px;
        }
    }
`;
