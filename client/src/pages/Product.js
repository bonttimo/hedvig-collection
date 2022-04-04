import styled from "styled-components";
import { motion } from "framer-motion";

import image1 from "../assets/display/Hedvig-2021_12-1.jpg";

import { pageTransition } from "../FramerMotion";

const Product = () => {
    return (
        <Container className="page-product" initial="enter" animate="animate" exit="exit" variants={pageTransition}>
            <Content>
                <h1>Product</h1>
            </Content>
        </Container>
    );
};

export default Product;

const Container = styled(motion.section)`
    position: relative;
    min-height: 100vh;
    width: 100%;
`;

const Content = styled.section`
    max-width: ${({ theme }) => theme.layout.maxWidth};
    padding: 0 ${({ theme }) => theme.layout.gutter};
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto;
    gap: 1rem;
    margin: 6rem auto;
`;
