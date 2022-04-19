import { useLayoutEffect, useContext, useState } from "react";

import styled from "styled-components";
import { motion } from "framer-motion";

import { BagContext } from "../context/BagContext";

import { FadeInStagger } from "../FramerMotion";
import Button from "../components/Button";

import { pageTransition } from "../FramerMotion";

const Cart = () => {
    const { showCart, isCartOpen, checkout, removeItemFromCheckout } = useContext(BagContext);

    return (
        <Container className="page-cart" initial="enter" animate="animate" exit="exit" variants={pageTransition}>
            <Content>
                <Products className="products" initial="start" animate="end" variants={FadeInStagger}>
                    {checkout.lineItems && checkout.lineItems.length > 0 ? (
                        <>
                            {checkout.lineItems.map((item) => {
                                return (
                                    <Product key={item.id} variants={FadeInStagger}>
                                        <div className="content">
                                            <h3>{item.title}</h3>
                                            <Group className="fold">
                                                <p>{item.variant.title}</p>
                                                {/* <span>/</span>
                                                <p>{item.color}</p>
                                                <span>/</span>
                                                <p>{item.size}</p> */}
                                            </Group>
                                            <Group>
                                                <p>{item.variant.price.replace(/\.00$/, "")}€</p>
                                                <p>{item.quantity}x</p>
                                            </Group>
                                            <button
                                                onClick={() => {
                                                    removeItemFromCheckout(item.id);
                                                }}
                                                className="scto">
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
                            <Button url="/shop" text="Shop now →" color="darkGreen" bg="offWhite" style="fill" />
                            <p>Your bag is empty</p>
                        </Empty>
                    )}
                </Products>
                <Shipping>
                    <Group>
                        <p>Shipping</p>
                        <p>Express (1-3 days)</p>
                    </Group>
                    <Group>
                        {checkout.lineItems && console.log(checkout)}
                        <p>Shipping cost</p>
                        <p>{checkout.lineItems && checkout.lineItems.length > 0 && checkout.shippingLine?.price ? checkout.shippingLine.price.replace(/\.00$/, "") : "0"}€</p>
                    </Group>
                    <Group>
                        <p>Sales Tax</p>
                        <p>{checkout.lineItems && checkout.lineItems.length > 0 ? checkout.totalPrice.replace(/\.00$/, "") : "0"}€</p>
                    </Group>
                </Shipping>
                <Total>
                    <Group>
                        <p className="scto">Estimated</p>
                        <p>{checkout.lineItems && checkout.lineItems.length > 0 ? checkout.totalPrice.replace(/\.00$/, "") : "0"}€</p>
                    </Group>
                </Total>
                <Button url={checkout.webUrl} text="Checkout →" color="darkGray" bg="darkGray" style="outline" />
            </Content>
        </Container>
    );
};

export default Cart;

const Container = styled(motion.section)`
    position: relative;
    min-height: 100vh;
    width: 100%;
`;

const Content = styled(motion.section)`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    max-width: var(--maxWidth);
    padding: 0 var(--gutter);
    height: 100%;
    width: 100%;
    max-width: 800px;
    margin: auto auto;
    margin-top: 6rem;
    margin-bottom: 6rem;
`;

const Group = styled.div`
    display: flex;
    align-items: baseline;
    margin-bottom: 1rem;
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
    border-bottom: solid 1px ${({ theme }) => theme.color.darkGray};
    margin-bottom: 3rem;
    padding-bottom: 3rem;
`;

const Product = styled(motion.section)`
    display: grid;
    grid-template-columns: 1.5fr auto;
    align-items: stretch;

    .content {
        display: flex;
        flex-direction: column;
    }
    .image {
        margin-left: 1rem;
    }
    h3 {
        margin-bottom: 0.3rem;
    }
    img {
        max-width: 200px;
    }
    button {
        text-decoration: underline;
        margin: auto auto auto 0;
        padding: 0;
        color: ${({ theme }) => theme.color.gray};
    }

    @media only screen and (max-width: 784px) {
        img {
            max-width: 150px;
        }
    }
`;

const Shipping = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 1rem;
    border-bottom: solid 1px ${({ theme }) => theme.color.darkGray};
    margin-bottom: 3rem;
    padding-bottom: 3rem;

    ${Group} {
        justify-content: space-between;
    }
`;

const Total = styled.section`
    margin-bottom: 3rem;
    padding-bottom: 3rem;
    text-transform: uppercase;

    ${Group} {
        justify-content: space-between;
    }
`;

const Empty = styled(motion.section)`
    display: flex;
    flex-direction: column;
    text-align: center;
`;
