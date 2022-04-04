import { useLayoutEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { BagContext } from "../context/BagContext";

import Button from "./Button";

const Bag = ({ ...props }) => {
    const { showBag, bagIsOpen } = useContext(BagContext);

    useLayoutEffect(() => {}, [bagIsOpen]);
    return (
        <Container className={`component-bag ${bagIsOpen ? "open" : ""}`}>
            <Content></Content>
        </Container>
    );
};

export default Bag;

const Container = styled.section`
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 0;
    z-index: 99;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.color.darkGreen};
    max-width: 550px;
    width: 100%;
    transition: transform ease 500ms;

    transform: translateX(100%);
    &.open {
        transform: translateX(0);
    }
`;

const Content = styled.section`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;
