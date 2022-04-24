import { useState, useLayoutEffect, useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { BagContext } from "../context/BagContext";
import { pageTransition, FadeIn, FadeInStagger, fadeInOut } from "../FramerMotion";

import { getSizes, getColors, arrayIsEqual } from "../functions/product";
import Button from "../components/Button";
import { getSingleProduct, getRandomProducts } from "../ShopifyQueries.js";

import SizeChart from "../components/SizeChart";

const Product = () => {
    let { id } = useParams();
    const { addItemToCeckout } = useContext(BagContext);
    const [product, setProduct] = useState(null);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [showSizeChart, setShowSizeChart] = useState(false);

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
    }, [product, relatedProducts, productVariants, selectedSize, selectedColor, showSizeChart]);

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
        setSelectedSize(null);
        setSelectedProduct(null);
        setSelectedColor(color.target.dataset.color);
    };

    const addItem = () => {
        if (selectedProduct && selectedProduct.id) {
            addItemToCeckout(selectedProduct.id, 1);
        } else {
            setError("There was an errror adding the item to your cart. Please try again later.");
        }
    };

    return (
        <Container className="page-product" initial="enter" animate="animate" exit="exit" variants={pageTransition}>
            <SizeChart open={showSizeChart} close={() => setShowSizeChart(!showSizeChart)} />
            <AnimatePresence key="error">
                {error && (
                    <Error onClick={() => setError(null)} initial="hidden" animate={error !== null ? "visible" : "hidden"} exit="exit" variants={fadeInOut}>
                        <p className="scto">{error}</p>
                    </Error>
                )}
            </AnimatePresence>
            {product !== null && selectedColor !== null ? (
                <>
                    <Content>
                        <Gallery initial="start" animate="end" variants={FadeIn}>
                            <Swiper
                                modules={[Pagination, Navigation]}
                                spaceBetween={0}
                                slidesPerView={1}
                                autoHeight={true}
                                navigation
                                observer
                                observeParents
                                pagination={{ clickable: true, type: "progressbar", el: ".gallery-pagination" }}
                                scrollbar={{ draggable: true }}
                                onSwiper={(swiper) => {
                                    swiper.updateAutoHeight(800);
                                }}
                                onSlideChange={() => console.log("")}>
                                {product.images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={image.src} alt={image.altText} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <ProductStatus className="product-status">
                                {/* <Preorder>Pre order</Preorder> */}
                                {!product.availableForSale && <SoldOut>Sold Out</SoldOut>}
                            </ProductStatus>
                            <div className="gallery-pagination"></div>
                        </Gallery>
                        <ProductDetails>
                            <Group className="productDetails">
                                <h1>{product.title}</h1>
                                <Row>
                                    <p className="material uppercase scto">{product.metafields[0].value}</p>
                                    <span className="uppercase scto">|</span>
                                    <p className="price uppercase scto">{product.variants[0].price.replace(/\.00$/, "")} €</p>
                                </Row>
                            </Group>
                            <Group>
                                <Sizes className="size">
                                    <p className="scto">
                                        Sizes available (EU) <button onClick={() => setShowSizeChart(!showSizeChart)}>Size quide →</button>
                                    </p>
                                    <ul>
                                        {Object.values(getSizes(showCorrectVariant(productVariants, { type: "Color", value: selectedColor }))).map(({ value, qty }, index) => (
                                            <li key={index} className={`${qty <= 0 ? "soldOut" : "available"} ${value === selectedSize ? "selected" : ""}`} onClick={() => (qty > 0 ? selectSize(value) : "")} data-size={value}>
                                                <p className="scto" onClick={() => (qty > 0 ? selectSize(value) : "")} data-size={value}>
                                                    {value}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </Sizes>
                            </Group>
                            <Group>
                                <Colors className="color">
                                    <p className="scto">Colours available</p>
                                    <Row>
                                        {Object.values(getColors(product.variants)).map(({ value, qty, name }, index) => (
                                            <div key={index} onClick={selectColor} className={selectedColor === name ? "selected" : ""} style={{ backgroundColor: value }} data-color={name}></div>
                                        ))}
                                    </Row>
                                </Colors>
                            </Group>
                            <Group className="buy">
                                <Button url="#" text="Add to bag →" disabled={selectedProduct === null ? true : false} color="white" bg="blue" style="fill" onClick={addItem} />
                                {/* <Button url="#" text="Preorder" color="gray" bg="gray" style="outline" /> */}
                            </Group>
                            <Group className="productInfo">
                                <div className="shopify-description" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>
                            </Group>
                        </ProductDetails>
                    </Content>
                    <RelatedProducts className="related-products" initial="start" animate="end" variants={FadeInStagger}>
                        <h2 className="scto uppercase">You may also like</h2>
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
            ) : (
                <Loading>
                    <h4>Loading product...</h4>
                </Loading>
            )}
        </Container>
    );
};

export default Product;

const Container = styled(motion.section)`
    position: relative;
    min-height: 100vh;
    width: 100%;

    h1 {
        font-size: var(--h3);
    }

    .productDetails {
        p,
        span {
            font-size: var(--text-smaller);
        }
    }

    .size,
    .color {
        p,
        li,
        a,
        button {
            font-size: var(--text-smaller);
        }
    }

    .buy {
        button a {
            font-size: var(--text-smaller);
        }
    }

    .productInfo {
        p {
            font-size: var(--text-medium);
        }
    }

    .related-products {
        h2,
        p {
            font-size: var(--text-small);
        }
        p {
            font-family: var(--noeStandard);
        }
    }

    @media only screen and (max-width: 900px) {
        .productInfo {
            p,
            ul,
            li {
                font-size: var(--text-medium);
            }
        }

        .related-products {
            h2 {
                font-size: var(--text-tiny);
            }
        }
    }
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
        padding: 0;
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
        height: 3px;
        margin: 1rem 0 0 auto;
        width: 75%;
        position: relative;
        background-color: ${({ theme }) => theme.color.gray};
        .swiper-pagination-progressbar-fill {
            background-color: ${({ theme }) => theme.color.darkGray};
        }
        @media only screen and (max-width: 784px) {
            margin: 1rem auto 0 auto;
        }
    }

    .swiper-button-prev,
    .swiper-button-next {
        background-repeat: no-repeat;
        width: 50px;
        height: 100px;
        top: calc(50% - 25px);
        &:after {
            color: ${({ theme }) => theme.color.black};
            display: none;
        }
    }

    .swiper-button-next {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 70 140' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%235C5C5C' d='m.354.646 69 69M.354 139.354l69-69' /%3E%3C/svg%3E");
        right: 20px;
    }
    .swiper-button-prev {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 70 140' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%235C5C5C' d='m69.646.646-69 69M69.646 139.354l-69-69' /%3E%3C/svg%3E");
        left: 20px;
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

    h1 {
        margin-bottom: 0.6rem;
    }

    .buy {
        margin: 1rem 0;
    }
    .productInfo {
        h6 {
            margin-bottom: 0.6rem;
        }
        ul {
            list-style: disc;
            li {
                margin-bottom: 0.5rem;
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
    align-items: center;
    align-items: baseline;

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

    button {
        color: ${({ theme }) => theme.color.darkGray};
    }
    p a {
        margin-left: 0.5rem;
    }
    ul {
        display: flex;
        list-style: none;
    }
    li {
        transition: all ease-out 300ms;
        margin-left: 0.5rem;
        padding: 0.3rem;

        &:first-child {
            margin-left: 0;
        }
        &.soldOut {
            color: ${({ theme }) => theme.color.gray};
        }
        &.available {
            &:hover,
            &.selected {
                background-color: ${({ theme }) => theme.color.black};
                color: ${({ theme }) => theme.color.white};
                cursor: pointer;
                /* text-decoration: underline; */
            }
        }
    }
`;

const Colors = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 0.5rem;
    transition: all ease-out 300ms;

    & > section div {
        width: 13px;
        height: 13px;
        border-radius: 100px;
        transition: all ease-out 300ms;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover,
        &.selected {
            cursor: pointer;
            transform: scale(1.3);
            &:after {
                opacity: 1;
            }
        }
        &:after {
            transition: all ease-out 300ms;
            content: "";
            position: absolute;
            width: 3px;
            height: 3px;
            background-color: ${({ theme }) => theme.color.white};
            border-radius: 100px;
            opacity: 0;
            box-shadow: 0 0 0 1px ${({ theme }) => theme.color.darkGray};
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
        margin-bottom: 3rem;
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

const Loading = styled(motion.section)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 100px);
`;
