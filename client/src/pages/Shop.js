import { useLayoutEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { ImageBlock, ImageBlockItem } from "../components/ImageBlock";
import { ProductItem } from "../components/ProductItem";

import image4 from "../assets/display/Screenshot-2022-02-20-at-12-14-1.jpg";
import image5 from "../assets/display/Screenshot-2022-02-20-at-12-13-1.jpg";

import { pageTransition } from "../FramerMotion";
import { getProducts } from "../ShopifyQueries.js";

const Shop = () => {
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [halfway, setHalfway] = useState(null);

    useLayoutEffect(() => {
        if (products.length === 0) {
            (async () => {
                try {
                    await window.client.graphQLClient.send(getProducts(40)).then(({ model, data }) => {
                        setProducts(model.products);
                        setHalfway(Math.ceil(model.products.length / 2));
                    });
                } catch (err) {
                    setProducts([]);
                    setError("Could not load products");
                }
            })();
        }
    }, [products]);

    return (
        <Container className="page-shop" initial="enter" animate="animate" exit="exit" variants={pageTransition}>
            <Fragment>
                {products.length > 0 && error === null ? (
                    <ProductGrid className="productGrid">
                        {products.map((product, index) => (
                            <Fragment key={product.id}>{index < halfway && product.availableForSale && <ProductItem img={product.images[0].src} title={product.title} description={product.metafields[0].value} price={product.variants[0].price} sizes={product.variants} colors={product.variants} url={`/product/${product.handle}`} />}</Fragment>
                        ))}
                    </ProductGrid>
                ) : (
                    <p>{error}</p>
                )}
            </Fragment>

            <ImageBlock color="offWhite">
                <ImageBlockItem image={image4} />
                <ImageBlockItem title="Hedvig Knit — Merino Wool Sweater Aniline" body="Crafted with care of the finest materials available. Designed to endure for many years to come. With responsible choices at our core, HEDVIG offers multi-purposed garments to be with you wherever you may go." button="Read our story" url="/about" bg="green" style="left" />
            </ImageBlock>

            <Fragment>
                {products.length > 0 && error === null ? (
                    <ProductGrid className="productGrid">
                        {products.map((product, index) => (
                            <Fragment key={product.id}>{index >= halfway && product.availableForSale && <ProductItem img={product.images[0].src} title={product.title} description={product.metafields[0].value} price={product.variants[0].price} sizes={product.variants} colors={product.variants} url={`/product/${product.handle}`} />}</Fragment>
                        ))}
                    </ProductGrid>
                ) : (
                    <p>{error}</p>
                )}
            </Fragment>

            <ImageBlock color="offWhite">
                <ImageBlockItem title="Hedvig Knit — Merino Wool Sweater Aniline" body="Helsinki-based womenswear brand that values the beauty of enjoyment with a responsible approach to all we do." button="Read our story" url="/about" bg="lightBlue" style="left" />
                <ImageBlockItem image={image5} />
            </ImageBlock>
        </Container>
    );
};

export default Shop;

const Container = styled(motion.section)`
    position: relative;
    min-height: 100vh;
    width: 100%;

    .component-imageBlock:nth-last-of-type(1) {
        margin-bottom: 5rem;
    }
`;

const ProductGrid = styled.section`
    max-width: var(--maxWidth);
    padding: 0 var(--gutter);
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto;
    gap: 1rem;
    margin: 6rem auto;

    @media only screen and (max-width: 784px) {
        grid-template-columns: 1fr;
        gap: 3rem;
        margin: 3rem auto;
    }
`;

//<ProductItem key={product.id} img={product.images[0].src} colors={product.options.filter((option) => option.name === "Color")[0].values.map((color) => color.value)} sizes={product.options.filter((option) => option.name === "Size")[0].values.map((size) => size.value)} preorder={product.options.filter((option) => option.name === "Preorder")[0].values[0].value} material={product.options.filter((option) => option.name === "Material")[0].values[0].value} title={product.title} description={product.description} price={product.variants[0].price} url={`/product/${product.id}`} />

// await window.client.product.fetchAll().then((products) => {
//     setProducts(products);
// });

// let state = {
//     products: [],
//     product: {},
//     checkout: {},
//     isCartOpen: false,
// };

// <ProductGrid className="productGrid">
//  <ProductItem img={image9} colors={["#000000"]} sizes={{ 36: 0 }} material="100 % Silk" title="Daiquiri" description="Silk chiffon black" price="890" />
//  <ProductItem img={image8} colors={["#B6D4DE", "#750E4C"]} sizes={{ 37: 1, 38: 29, 40: 4, 41: 0 }} preorder="false" title="Hedvig Knit" material="100 % Merino Wool" description="Merino wool sweater aniline" price="390" />
//  <ProductItem img={image10} colors={["#B6D4DE", "#750E4C"]} sizes={{ 38: 1, 40: 9 }} preorder="true" title="Hedvig Knit" material="100 % Merino Wool" description="Merino wool sweater aniline" price="390" />
// </ProductGrid>
