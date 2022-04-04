import { useLayoutEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { ImageBlock, ImageBlockItem } from "../components/ImageBlock";
import { ProductItem } from "../components/ProductItem";

import image1 from "../assets/display/Hedvig-2021_12-1.jpg";
import image2 from "../assets/display/Hedvig-2021_10-1.jpg";

import image4 from "../assets/display/Screenshot-2022-02-20-at-12-14-1.jpg";
import image5 from "../assets/display/Screenshot-2022-02-20-at-12-13-1.jpg";
import image7 from "../assets/display/Hedvig-2021_7-1.jpg";
import image8 from "../assets/display/Hedvig-2021_8-1.jpg";
import image9 from "../assets/display/Hedvig-2021_14-1.jpg";
import image10 from "../assets/display/Hedvig-2021_3-1.jpg";

import { pageTransition } from "../FramerMotion";

const Shop = () => {
    return (
        <Container className="page-shop" initial="enter" animate="animate" exit="exit" variants={pageTransition}>
            <ProductGrid className="productGrid">
                <ProductItem img={image1} colors={["#000000"]} sizes={{ 36: 0, 38: 29, 40: 0 }} preorder="true" material="100 % Silk" title="Daiquiri" description="Silk chiffon black" price="890" url={`/product/1`} />
                <ProductItem img={image2} colors={["#B6D4DE", "#750E4C"]} preorder="false" sizes={{ 36: 0, 38: 0, 40: 0 }} title="Hedvig Knit" material="100 % Merino Wool" description="Merino wool sweater aniline" price="390" />
                <ProductItem img={image7} colors={["#B6D4DE", "#750E4C"]} sizes={{ 36: 1, 38: 29, 40: 4 }} title="Hedvig Knit" material="100 % Merino Wool" description="Merino wool sweater aniline" price="390" />
            </ProductGrid>

            <ImageBlock color="offWhite">
                <ImageBlockItem image={image4} />
                <ImageBlockItem title="Hedvig Knit — Merino Wool Sweater Aniline" body="Crafted with care of the finest materials available. Designed to endure for many years to come. With responsible choices at our core, HEDVIG offers multi-purposed garments to be with you wherever you may go." button="Read our story" url="/about" bg="green" style="left" />
            </ImageBlock>

            <ProductGrid className="productGrid">
                <ProductItem img={image9} colors={["#000000"]} sizes={{ 36: 0 }} material="100 % Silk" title="Daiquiri" description="Silk chiffon black" price="890" />
                <ProductItem img={image8} colors={["#B6D4DE", "#750E4C"]} sizes={{ 37: 1, 38: 29, 40: 4, 41: 0 }} preorder="false" title="Hedvig Knit" material="100 % Merino Wool" description="Merino wool sweater aniline" price="390" />
                <ProductItem img={image10} colors={["#B6D4DE", "#750E4C"]} sizes={{ 38: 1, 40: 9 }} preorder="true" title="Hedvig Knit" material="100 % Merino Wool" description="Merino wool sweater aniline" price="390" />
            </ProductGrid>

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
`;

const ProductGrid = styled.section`
    max-width: ${({ theme }) => theme.layout.maxWidth};
    padding: 0 ${({ theme }) => theme.layout.gutter};
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto;
    gap: 1rem;
    margin: 6rem auto;
`;
