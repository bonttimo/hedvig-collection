import { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { pageTransition, FadeIn, FadeInStagger } from "../FramerMotion";

import { getSizes, getColors } from "../functions/product";
import Button from "../components/Button";
import { getSingleProduct, getRandomProducts } from "../ShopifyQueries.js";

const Product = () => {
    let { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);

    useLayoutEffect(() => {
        if (product === null) {
            (async () => {
                try {
                    await window.client.graphQLClient.send(getSingleProduct(id)).then(({ model, data }) => {
                        setProduct(model.products[0]);
                    });
                } catch (err) {
                    setProduct(null);
                }

                try {
                    await window.client.graphQLClient.send(getRandomProducts(20, id)).then(({ model, data }) => {
                        setRelatedProducts(model.products.sort(() => 0.5 - Math.random()).slice(0, 3));
                    });
                } catch (e) {
                    setRelatedProducts(null);
                }
            })();
        }
    }, [product, relatedProducts]);

    const selectSize = (size) => {
        console.log("Select");
    };
    return (
        <Container className="page-product" initial="enter" animate="animate" exit="exit" variants={pageTransition}>
            {product !== null && (
                <>
                    <Content>
                        <Gallery initial="start" animate="end" variants={FadeIn}>
                            <img loading="lazy" src={product.images[0].src} alt="" />
                            <ProductStatus className="product-status">
                                <Preorder>Pre order</Preorder>
                                <SoldOut>Sold Out</SoldOut>
                            </ProductStatus>
                        </Gallery>
                        <ProductDetails>
                            <Group>
                                <h2>{product.title}</h2>
                                <Row>
                                    <p className="material">{product.metafields[0].value}</p>
                                    <span>|</span>
                                    <p className="price">{product.variants[0].price.replace(/\.00$/, "")} €</p>
                                </Row>
                            </Group>
                            <Group>
                                <Sizes>
                                    <p>
                                        Sizes available (EU) <a href="#">Size quide →</a>
                                    </p>
                                    <ul>
                                        {Object.values(getSizes(product.variants)).map(({ value, qty }, index) => (
                                            <li key={index} className={qty <= 0 ? "soldOut" : ""}>
                                                <p onClick={() => (qty > 0 ? selectSize() : "")} data-size={value}>
                                                    {value}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </Sizes>
                            </Group>
                            <Group>
                                <Colors>
                                    <p>Colours available</p>
                                    <Row>
                                        {Object.values(getColors(product.variants)).map(({ value, qty }, index) => (
                                            <div key={index} style={{ backgroundColor: value }}></div>
                                        ))}
                                    </Row>
                                </Colors>
                            </Group>
                            <Group>
                                <Button url="#" text="Add to bag →" color="white" bg="lightBlue" style="fill" />
                                <Button url="#" text="Preorder" color="gray" bg="gray" style="outline" />
                            </Group>
                            <Group className="productInfo" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></Group>
                        </ProductDetails>
                    </Content>
                    <RelatedProducts initial="start" animate="end" variants={FadeInStagger}>
                        <h2 className="scto">Related products</h2>
                        {relatedProducts !== null ? (
                            <div className="products">
                                {relatedProducts.map((product, index) => (
                                    <Link className="product" to={`/product/${product.handle}`} key={index}>
                                        <motion.img loading="lazy" src={product.images[0].src} alt="" variants={FadeInStagger} />
                                        <p>{product.title}</p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p>Loading related products</p>
                        )}
                    </RelatedProducts>
                </>
            )}
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    max-width: var(--maxWidth);
    margin: 0 auto;
    gap: 7rem;

    .button {
        width: 100%;
        max-width: 290px;
        text-align: center;
        justify-content: center;
    }

    @media only screen and (max-width: 784px) {
        grid-template-columns: 1fr;
        gap: 3rem;
        .button {
            max-width: 100%;
        }
    }
`;

const Gallery = styled(motion.section)`
    img {
        object-fit: cover;
        height: 100%;
    }
`;

const ProductDetails = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
    align-items: start;
    gap: 2rem;
    margin-top: 100px;
    padding: 0 var(--gutter);

    .productInfo {
        ul {
            list-style: disc;
            li {
                margin-bottom: 1rem;
            }
        }
    }
    @media only screen and (max-width: 784px) {
        margin-top: 0;
    }
`;

const Group = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 1rem;
`;

const Row = styled.section`
    display: flex;

    * {
        margin-right: 1rem;
        &:last-child {
            margin-right: 0;
        }
    }
`;

const ProductStatus = styled.section`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    z-index: 10;
    width: 100%;
`;

const SoldOut = styled.p`
    padding: 1rem 2rem;
    background-color: ${({ theme }) => theme.color.darkGreen};
    color: ${({ theme }) => theme.color.offWhite};
    margin: 0 0 0 auto;
`;

const Preorder = styled.p`
    padding: 1rem;
    margin: 0 auto 0 0;
`;

const Sizes = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 1rem;

    p a {
        margin-left: 0.5rem;
    }
    ul {
        display: flex;
        list-style: none;
    }
    li {
        margin-left: 0.5rem;
        &:first-child {
            margin-left: 0;
        }
        &.soldOut {
            color: ${({ theme }) => theme.color.gray};
        }
    }
`;

const Colors = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 1rem;
    & > section div {
        width: 15px;
        height: 15px;
        border-radius: 100px;
    }
`;

const RelatedProducts = styled(motion.section)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8rem var(--gutter);
    height: 400px;
    height: auto;

    h2 {
        margin-bottom: 5rem;
    }
    .products {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto;
        gap: 5rem;

        img {
            max-width: 400px;
            height: 100%;
        }
        .product {
            display: flex;
            flex-direction: column;
            align-items: center;
            p {
                margin-top: 1.5rem;
            }
        }
    }

    @media only screen and (max-width: 784px) {
        padding: 6rem var(--gutter) 3rem var(--gutter);
        h2 {
            margin-bottom: 2rem;
        }
        .products {
            grid-template-columns: 1fr;
            gap: 2rem;
            img {
                max-width: 100%;
            }
            .product {
                p {
                    margin-top: 0.5rem;
                }
            }
        }
    }
`;
