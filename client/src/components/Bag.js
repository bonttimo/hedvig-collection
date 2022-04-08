import { useLayoutEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

import { BagContext } from "../context/BagContext";
import { FadeInStagger } from "../FramerMotion";

import { Close } from "../assets/display/Svg";
import Button from "./Button";

import image2 from "../assets/display/Hedvig-2021_12-1.jpg";
import image9 from "../assets/display/Hedvig-2021_14-1.jpg";

const Bag = ({ ...props }) => {
    const { showBag, bagIsOpen } = useContext(BagContext);
    const location = useLocation();
    const [offset, setOffset] = useState(null);

    const bagItems = [
        {
            id: 1,
            title: "Daiquiri",
            content: "Silk Chiffon Dress",
            color: "balck",
            size: "38",
            price: "890",
            qty: 1,
            image: image2,
        },
        {
            id: 2,
            title: "Sui Lieviti",
            content: "Dress",
            color: "Light beige",
            size: "38",
            price: "390",
            qty: 1,
            image: image9,
        },
    ];

    useLayoutEffect(() => {
        setOffset(document.querySelector(".mainMenu").getBoundingClientRect().height);
        showBag(false);
    }, [location]);

    return (
        <Container className={`component-bag ${bagIsOpen ? "open" : ""}`}>
            <Content offset={offset}>
                <header>
                    <p>Bag</p>
                    <Close onClick={() => showBag()} />
                </header>

                <main>
                    <Products className="products" initial="start" animate="end" variants={FadeInStagger}>
                        {bagItems.map((item) => {
                            return (
                                <Product key={item.id} variants={FadeInStagger}>
                                    <div className="content">
                                        <h3>{item.title}</h3>
                                        <Group className="fold">
                                            <p>{item.content}</p>
                                            <span>/</span>
                                            <p>{item.color}</p>
                                            <span>/</span>
                                            <p>{item.size}</p>
                                        </Group>
                                        <Group>
                                            <p>{item.price}€</p>
                                            <p>{item.qty}x</p>
                                        </Group>
                                        <button className="scto">Remove</button>
                                    </div>
                                    <div className="image">
                                        <img loading="lazy" src={item.image} alt="" />
                                    </div>
                                </Product>
                            );
                        })}
                    </Products>
                    <footer>
                        <p className="scto">
                            In total <span>1280 €</span>
                        </p>
                        <Link to="/cart">Edit Bag →</Link>
                    </footer>
                </main>

                <Button url="/cart" text="Checkout →" color="darkGreen" bg="offWhite" style="fill" />
            </Content>
        </Container>
    );
};

export default Bag;

const Container = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    position: fixed;
    right: 0;
    z-index: 9999;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.color.darkGreen};
    max-width: 600px;
    width: 100%;
    height: 100%;
    transition: transform ease 500ms;
    overflow-y: auto;

    transform: translateX(100%);
    &.open {
        transform: translateX(0);
    }
`;

const Content = styled.section`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    padding: 2.5rem;
    margin-bottom: 2rem;
    padding-top: ${({ currentPage, pages, offset }) => `${offset + 30}px`};
    color: ${({ theme }) => theme.color.offWhite};

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        svg {
            width: 64px;
            height: 64px;
            cursor: pointer;
        }
    }

    main {
        display: flex;
        flex-direction: column;
        margin-top: 4rem;
        margin-bottom: 4rem;

        .image {
            margin-left: 1rem;
        }
        footer {
            border-top: solid 1px ${({ theme }) => theme.color.offWhite};
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 2rem;
            margin-top: 2rem;
            text-transform: uppercase;

            p {
                span {
                    margin-left: 0.5rem;
                }
            }
        }
    }
    .button {
        margin: auto 0 0 0;
    }

    @media only screen and (max-width: 784px) {
        padding-top: 30px;
    }
`;

const Group = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: baseline;
    * {
        margin-right: 0.5rem;
    }
    @media only screen and (max-width: 784px) {
        &.fold {
            flex-direction: column;
            span {
                display: none;
            }
        }
    }
`;

const Products = styled(motion.section)`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 2rem;
`;

const Product = styled(motion.section)`
    .content {
        display: flex;
        flex-direction: column;
    }
    h3 {
        margin-bottom: 0.3rem;
    }
    display: grid;
    grid-template-columns: 2fr 1fr;
    button {
        text-decoration: underline;
        margin: auto auto auto 0;
        padding: 0;
        color: ${({ theme }) => theme.color.offWhite};
    }
`;
