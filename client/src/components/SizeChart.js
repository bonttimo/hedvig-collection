import { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import { Close } from "../assets/display/Svg";
import { coockieFade } from "../FramerMotion";

import sizeChart from "../assets/display/sizeChart.png";

const SizeChart = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        setIsOpen(!isOpen);
    };

    return ReactDOM.createPortal(
        <>
            <AnimatePresence key="sizeChart">
                {isOpen && (
                    <Container className={`component-sizeChart`} initial="hidden" animate={isOpen ? "visible" : "hidden"} exit="exit" variants={coockieFade}>
                        <Content>
                            <Header>
                                <h6 className="scto">Size Chart</h6>
                                <Close onClick={onClick} />
                            </Header>
                            <img src={sizeChart} alt="Size guide" />
                        </Content>
                    </Container>
                )}
            </AnimatePresence>
        </>,
        document.getElementById("root"),
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
    }
`;

const Header = styled.header`
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
`;
