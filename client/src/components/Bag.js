import { useLayoutEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

import { BagContext } from "../context/BagContext";
import { FadeInStagger } from "../FramerMotion";

import { Close } from "../assets/display/Svg";
import Button from "./Button";

const Bag = ({ ...props }) => {
    const { showCart, isCartOpen, checkout, removeItemFromCheckout } = useContext(BagContext);
    const location = useLocation();
    const [offset, setOffset] = useState(null);

    useLayoutEffect(() => {
        setOffset(document.querySelector(".mainMenu").getBoundingClientRect().height);
        showCart(false);
    }, [location]);

    return (
        <Container className={`component-bag ${isCartOpen ? "open" : ""}`}>
            <Content offset={offset}>
                <header>
                    <p>Bag</p>
                    <Close onClick={() => showCart()} />
                </header>

                <main>
                    <Products className="products" initial="start" animate="end" variants={FadeInStagger}>
                        {checkout.lineItems && checkout.lineItems.length > 0 ? (
                            <>
                                {checkout.lineItems.map((item) => {
                                    return (
                                        <Product key={item.id} variants={FadeInStagger}>
                                            <div className="content">
                                                <h4>{item.title}</h4>
                                                <Group className="fold">
                                                    <p>{item.variant.title}</p>
                                                </Group>
                                                <Group>
                                                    <p>{item.variant.price.replace(/\.00$/, "")} € </p>
                                                    <p> X </p>
                                                    <p>{item.quantity}</p>
                                                </Group>
                                                <button
                                                    onClick={() => {
                                                        removeItemFromCheckout(item.id);
                                                    }}
                                                    className="scto uppercase">
                                                    Remove
                                                </button>
                                            </div>
                                            <div className="image">
                                                <img loading="lazy" src={item.variant.image.src} alt="" />
                                            </div>
                                        </Product>
                                    );
                                })}
                            </>
                        ) : (
                            <Empty>
                                <p>Your bag is empty</p>
                                <Button url="/shop" animate={false} text="Shop now →" color="darkGreen" bg="offWhite" style="fill" internal={true} />
                            </Empty>
                        )}
                    </Products>
                    <footer>
                        <p className="scto">
                            In total <span>{checkout.lineItems && checkout.lineItems.length > 0 ? checkout.totalPrice.replace(/\.00$/, "") : "0"} €</span>
                        </p>
                        <Link to="/cart" className="scto">
                            Edit Bag →
                        </Link>
                    </footer>
                </main>

                <Button url={checkout.webUrl} animate={false} text="Checkout →" color="darkGray" bg="offWhite" style="fill" internal={false} />
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

    header {
        p {
            font-size: var(--text-small);
            font-family: var(--noeStandard);
        }
    }

    p,
    a,
    button {
        font-size: var(--text-smaller);
        font-family: var(--scto);
    }
`;

const Content = styled.section`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    padding: 2.5rem;
    margin-bottom: 2rem;
    /* padding-top: ${({ currentPage, pages, offset }) => `${offset + 30}px`}; */
    padding-top: 2rem;
    color: ${({ theme }) => theme.color.offWhite};

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        svg {
            width: 56px;
            height: 56px;
            cursor: pointer;
            stroke: ${({ theme }) => theme.color.offWhite};
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
            border-top: solid 1px ${({ theme }) => theme.color.darkGray};
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 1rem;
            margin-top: 1rem;
            text-transform: uppercase;

            a {
                color: ${({ theme }) => theme.color.offWhite};
            }
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
    margin-bottom: 1rem;
`;

const Product = styled(motion.section)`
    .content {
        display: flex;
        flex-direction: column;
    }
    h4 {
        margin-bottom: 0.5rem;
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

const Empty = styled(motion.section)`
    display: flex;
    flex-direction: column;
    p {
        text-align: center;
        padding: 0 0 3rem 0;
    }
`;
