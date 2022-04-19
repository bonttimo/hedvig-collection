import { useState, useLayoutEffect, useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { BagContext } from "../context/BagContext";
import { pageTransition, FadeIn, FadeInStagger, fadeInOut } from "../FramerMotion";

import { getSizes, getColors, arrayIsEqual } from "../functions/product";
import Button from "../components/Button";
import { getSingleProduct, getRandomProducts } from "../ShopifyQueries.js";

const Product = () => {
    let { id } = useParams();
    const { addItemToCeckout, checkout } = useContext(BagContext);
    const [product, setProduct] = useState(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    const [error, setError] = useState();

    const [productVariants, setProductVariants] = useState([]);

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [relatedProducts, setRelatedProducts] = useState(null);

    const parseVariants = (variants) => {
        let parsedVariants = [];
        variants.forEach((variant) => {
            parsedVariants.push({
                id: variant.id,
                title: variant.title,
                price: variant.price,
                image: variant.image.src,
                selectedOptions: variant.selectedOptions,
                quantityAvailable: variant.quantityAvailable,
                metafields: variant.metafields,
            });
        });
        return parsedVariants;
    };

    const selectCorrectProductVariant = (selectedVariant) => {
        let selected = productVariants.filter((variant) => {
            let variantTitle = variant.title.split("/");
            variantTitle = variantTitle.map((title) => title.trim());
            if (arrayIsEqual(variantTitle, Object.values(selectedVariant))) return variant;
            else return null;
        });

        return selected[0];
    };

    const showCorrectVariant = (variants, find) => {
        const foundVariant = variants.filter((variant) => {
            const correctVariants = variant.selectedOptions.filter((option) => {
                if (option.name === find.type && option.value === find.value) {
                    return variant;
                } else return null;
            });
            if (correctVariants.length > 0) return correctVariants[0];
            else return null;
        });

        if (foundVariant) return foundVariant;
        else return variants;
    };

    useLayoutEffect(() => {
        if (product === null && hasLoaded === false) {
            (async () => {
                setHasLoaded(true);
                // Get product
                try {
                    await window.client.graphQLClient.send(getSingleProduct(id)).then(({ model, data }) => {
                        setProduct(model.products[0]);
                        setProductVariants(parseVariants(model.products[0].variants));
                        setSelectedColor(getColors(model.products[0].variants)[0].name);
                    });
                } catch (err) {
                    setProduct(null);
                }

                // Get related products
                try {
                    await window.client.graphQLClient.send(getRandomProducts(30, id)).then(({ model, data }) => {
                        setRelatedProducts(model.products.sort(() => 0.5 - Math.random()).slice(0, 3));
                    });
                } catch (e) {
                    setRelatedProducts(null);
                }
            })();
        }

        if (selectedColor && selectedSize) {
            setSelectedProduct(selectCorrectProductVariant([selectedSize, selectedColor]));
        }
    }, [product, relatedProducts, productVariants, selectedSize, selectedColor]);

    useEffect(() => {
        let timeout;
        if (error !== null) {
            timeout = setTimeout(() => {
                setError(null);
                console.log("NIW");
            }, 4000);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [error]);

    const selectSize = (size) => {
        setSelectedSize(size);
    };

    const selectColor = (color) => {
        setSelectedColor(color.target.dataset.color);
    };

    const addItem = () => {
        if (selectedProduct && selectedProduct.id) {
            addItemToCeckout(selectedProduct.id, 1);
        } else {
            setError("There was an errror adding the item to your cart. Please try again later.");
        }
        console.log("Add");
    };
    return (
        <Container className="page-product" initial="enter" animate="animate" exit="exit" variants={pageTransition}>
            <AnimatePresence key="error">
                {error && (
                    <Error onClick={() => setError(null)} initial="hidden" animate={error !== null ? "visible" : "hidden"} exit="exit" variants={fadeInOut}>
                        <p className="scto">{error}</p>
                    </Error>
                )}
            </AnimatePresence>
            {product !== null && selectedColor !== null && (
                <>
                    <Content>
                        <Gallery initial="start" animate="end" variants={FadeIn}>
                            <Swiper
                                modules={[Pagination]}
                                spaceBetween={0}
                                slidesPerView={1}
                                autoHeight={true}
                                pagination={{ clickable: true, type: "progressbar", el: ".gallery-pagination" }}
                                scrollbar={{ draggable: true }}
                                onSwiper={(swiper) => {
                                    swiper.updateAutoHeight(800);
                                }}
                                onSlideChange={() => console.log("slide change")}>
                                {product.images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={image.src} alt={image.altText} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <ProductStatus className="product-status">
                                <Preorder>Pre order</Preorder>
                                <SoldOut>Sold Out</SoldOut>
                            </ProductStatus>
                            <div className="gallery-pagination"></div>
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
                                        {Object.values(getSizes(showCorrectVariant(productVariants, { type: "Color", value: selectedColor }))).map(({ value, qty }, index) => (
                                            <li key={index} className={qty <= 0 ? "soldOut" : ""}>
                                                <p onClick={() => (qty > 0 ? selectSize(value) : "")} className={value === selectedSize ? "selected" : ""} data-size={value}>
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
                                        {Object.values(getColors(product.variants)).map(({ value, qty, name }, index) => (
                                            <div key={index} onClick={selectColor} className={selectedColor === name ? "selected" : ""} style={{ backgroundColor: value }} data-color={name}></div>
                                        ))}
                                    </Row>
                                </Colors>
                            </Group>
                            <Group>
                                <Button url="#" text="Add to bag →" disabled={selectedProduct === null ? true : false} color="white" bg="lightBlue" style="fill" onClick={addItem} />
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
    grid-template-columns: auto 1fr;
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

    @media only screen and (max-width: 1524px) {
        gap: 2rem;
    }
    @media only screen and (max-width: 1224px) {
        gap: 1rem;
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
    display: block;
    overflow: hidden;
    cursor: grab;
    max-width: 40vw;
    &:active {
        cursor: grabbing;
    }
    img {
        object-fit: cover;
        height: auto;
        max-height: 85vh;
        width: 100%;
    }
    .swiper-slide {
        object-fit: cover;
        height: 100%;
        width: auto;
        object-fit: contain;
        height: auto;
    }
    .gallery-pagination {
        height: 4px;
        margin: 1rem auto 0 auto;
        width: 75%;
        position: relative;
        background-color: ${({ theme }) => theme.color.gray};
        .swiper-pagination-progressbar-fill {
            background-color: ${({ theme }) => theme.color.darkGray};
        }
    }

    @media only screen and (max-width: 784px) {
        max-width: 100vw;
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

    @media only screen and (max-width: 1524px) {
        padding: 0 3rem;
    }
    @media only screen and (max-width: 1224px) {
        padding: 0 3rem;
        margin-top: 24px;
    }
    @media only screen and (max-width: 784px) {
        margin-top: 0;
    }
`;

const Group = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 0.5rem;
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
    gap: 0.5rem;

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
        &:hover,
        .selected {
            cursor: pointer;
            text-decoration: underline;
        }
    }
`;

const Colors = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 0.5rem;
    & > section div {
        width: 15px;
        height: 15px;
        border-radius: 100px;
        &:hover,
        &.selected {
            cursor: pointer;
            border: 1px solid ${({ theme }) => theme.color.black};
            outline: 1px solid ${({ theme }) => theme.color.white};
            box-shadow: ${({ theme }) => theme.color.darkGray} 1px 2px 4px 0px;
        }
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

const Error = styled(motion.section)`
    position: fixed;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    height: auto;
    width: auto;
    padding: 1.5rem;
    z-index: 9999;
    background-color: ${({ theme }) => theme.color.black};
    color: ${({ theme }) => theme.color.white};
    cursor: pointer;
`;
