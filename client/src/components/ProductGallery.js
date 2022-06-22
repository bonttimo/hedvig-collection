import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

import { FadeIn } from "../FramerMotion";

const ProductMetaDetails = ({ sizes, colors, material = "" }) => {
    // prettier-ignore
    const sizesList = Object.values(sizes).map(({ size, qty }, index) => <p key={index} className={qty <= 0 ? "sold-out" : ""}>{size}</p>);
    const colorsList = Object.values(colors).map(({ hex }, index) => <div key={index} style={{ backgroundColor: hex }}></div>);

    return (
        <ProductMetaDetailsContainer className="productMetaDetails">
            <div className="sizes">
                <p>Sizes (EU):</p>
                {sizesList}
            </div>

            <div className="colors">
                <p>Colours</p>
                {colorsList}
            </div>

            {material !== "" && (
                <div className="material">
                    <p>Material: {material}</p>
                </div>
            )}
        </ProductMetaDetailsContainer>
    );
};

const Product = ({ product }) => {
    const { displayTitle = "", material = "", preOrder = false, subtitle = "", handle, price, images = [], soldOut, globals } = product;

    return (
        <Link to={`/product/${handle}`} className="permalink">
            <ProductContainer className={`component-product-item`} initial="start" animate="end" variants={FadeIn}>
                <ProductMeta style={{ backgroundImage: `url(${images.variant.tiny})` }}>
                    <ProductData>
                        <header>
                            {preOrder && <Preorder>Pre-Order</Preorder>}
                            {globals.soldOut && <SoldOut>Sold out</SoldOut>}
                        </header>
                        <ProductMetaDetails sizes={globals.sizes} colors={globals.colors} material={material} />
                    </ProductData>
                    <img loading="lazy" src={images.variant.medium} alt={displayTitle} />
                </ProductMeta>

                <ProductBody>
                    <ProductMetaDetails sizes={globals.sizes} colors={globals.colors} material={material} />
                    <h3 className="title">{displayTitle}</h3>
                    <div className="group">
                        <p className="description">{subtitle}</p>
                        <span> </span>
                        <p className="price">{price} €</p>
                    </div>
                </ProductBody>
            </ProductContainer>
        </Link>
    );
};

const ProductGallery = ({ products }) => {
    return (
        <GalleryContainer className={`component-product-gallery`}>
            {products.map((product, index) => (
                <Product key={index} product={product} />
            ))}
        </GalleryContainer>
    );
};

export default ProductGallery;

const GalleryContainer = styled(motion.section)`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto;

    gap: 1rem;
    max-width: var(--maxWidth);
    padding: 0 var(--gutter);
    margin: 6.5rem auto;

    @media only screen and (max-width: 784px) {
        grid-template-columns: 1fr;
        gap: 3rem;
        margin: 3rem auto;
    }
`;

const ProductContainer = styled(motion.section)`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 300px;
`;

const ProductMetaDetailsContainer = styled(motion.section)`
    display: flex;
    flex-wrap: wrap;
    gap: 0.1rem 1rem;
    padding: 1rem;
    opacity: 0;
    transition: opacity 400ms ease;

    & > div {
        display: flex;
        justify-content: center;
        align-items: baseline;
        gap: 0.3rem;
        .sold-out {
            color: ${({ theme }) => theme.color.gray};
        }
    }
    .colors {
        & > div {
            width: 8px;
            height: 8px;
            background-color: ${({ theme }) => theme.color.darkGreen};
            border-radius: 100px;
        }
    }

    @media only screen and (max-width: 924px) {
        p,
        a {
            font-size: var(--text-tiny);
        }
    }
`;

const ProductMeta = styled(motion.section)`
    position: relative;
    top: 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(424px, 1fr) auto;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #e0d7d2;

    &:hover {
        .productMetaDetails {
            opacity: 1;
        }
    }

    header,
    .productMetaDetails {
        display: flex;
        font-family: var(--scto);
        font-size: var(--text-smaller);

        p {
            font-size: var(--text-smaller);
        }
    }

    header {
        justify-content: space-between;
    }

    img {
        object-fit: cover;
        height: 100%;
    }

    @media only screen and (min-width: 1500px) {
        grid-template-rows: minmax(750px, 1fr) auto;
    }

    @media only screen and (max-width: 1499px) {
        grid-template-rows: minmax(550px, 1fr) auto;
    }

    @media only screen and (max-width: 1250px) {
        grid-template-rows: minmax(350px, 1fr) auto;
    }

    @media only screen and (max-width: 924px) {
        .productMetaDetails {
            display: none;
        }
    }
`;

const ProductData = styled.section`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
`;

const Preorder = styled.p`
    padding: 1rem;
    text-transform: uppercase;
`;

const SoldOut = styled.p`
    text-transform: uppercase;
    padding: 1rem;
    background-color: ${({ theme }) => theme.color.darkGreen};
    color: ${({ theme }) => theme.color.offWhite};
`;

const ProductBody = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;

    .title {
        margin-bottom: 1rem;
        font-size: var(--text-huge);
    }

    .group {
        display: flex;
        justify-content: center;
        align-items: baseline;
        text-transform: uppercase;
        gap: 1rem;

        p {
            font-family: var(--scto);
            font-size: var(--text-smaller);
        }

        span {
            background-color: ${({ theme }) => theme.color.gray};
            width: 1px;
            height: 7px;
        }
    }

    .productMetaDetails {
        display: none;
    }

    @media only screen and (max-width: 1400px) {
        .title {
            font-size: var(--text-big);
        }

        p.description,
        p.price {
            font-size: var(--text-tiny);
        }
    }

    @media only screen and (max-width: 1100px) {
        p.price,
        span {
            display: none;
        }
    }

    @media only screen and (max-width: 924px) {
        margin-top: 0;
        .title {
            font-size: var(--text-huge);
        }

        .productMetaDetails {
            display: flex;
            opacity: 1;
        }
    }

    @media only screen and (max-width: 784px) {
        p.price,
        span {
            display: block;
        }
    }
`;
