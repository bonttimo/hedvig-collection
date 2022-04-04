import styled from "styled-components";
import { motion } from "framer-motion";

import image1 from "../assets/display/Hedvig-2021_12-1.jpg";

import image7 from "../assets/display/Hedvig-2021_7-1.jpg";
import image8 from "../assets/display/Hedvig-2021_8-1.jpg";
import image9 from "../assets/display/Hedvig-2021_14-1.jpg";

import { pageTransition } from "../FramerMotion";

import Button from "../components/Button";

const Product = () => {
    const sizes = { 36: 0, 38: 29, 40: 0 };
    const colors = ["#B6D4DE", "#750E4C"];

    const selectSize = (size) => {
        console.log("Select");
    };
    return (
        <Container className="page-product" initial="enter" animate="animate" exit="exit" variants={pageTransition}>
            <Content>
                <Gallery>
                    <img src={image1} alt="" />
                    <ProductStatus className="product-status">
                        <Preorder>Pre order</Preorder>
                        <SoldOut>Sold Out</SoldOut>
                    </ProductStatus>
                </Gallery>
                <ProductDetails>
                    <Group>
                        <h2>Daiquiri</h2>
                        <Row>
                            <p className="material">Silk chiffon dress black</p>
                            <span>|</span>
                            <p className="price">890€</p>
                        </Row>
                    </Group>
                    <Group>
                        <Sizes>
                            <p>
                                Sizes available (EU) <a href="#">Size quide →</a>
                            </p>
                            <ul>
                                {Object.entries(sizes).map(([size, qty], index) => (
                                    <li key={index} className={qty <= 0 ? "soldOut" : ""}>
                                        <p onClick={() => (qty > 0 ? selectSize() : "")} data-size={size}>
                                            {size}
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
                                {colors.map((color, index) => (
                                    <div key={index} style={{ backgroundColor: color }}></div>
                                ))}
                            </Row>
                        </Colors>
                    </Group>
                    <Group>
                        <Button url="#" text="Add to bag →" color="white" bg="lightBlue" style="fill" />
                        <Button url="#" text="Preorder" color="gray" bg="gray" style="outline" />
                    </Group>
                    <Group>
                        <h6>Description</h6>
                        <p>Hedvig’s DAIQUIRI dress is made of Italian silk and silk chiffon and produced in Lithuania. The dress has a top part that closes at back with hooks and turtleneck to be tied behind the neck, it features both silk and silk chiffon ruffles along the sleeves and the necktie, with raw edges on the ruffles. The front part of the dress is divided in two parts with a cut-out flattering the midriff area. The hem of the dress closes like a wrapped skirt creating a beautiful movement to the hem and occasionally showing a little leg.</p>
                    </Group>
                    <Group>
                        <h6>Details</h6>
                        <ul>
                            <li>The model is 176cm tall and wearing size 38</li>
                            <li>Black</li>
                            <li>100% silk (back of top part and sleeves 100% silk chiffon)</li>
                            <li>Dry clean only</li>
                        </ul>
                    </Group>
                </ProductDetails>
            </Content>
            <RelatedProducts>
                <h2 className="scto">Related products</h2>
                <div className="products">
                    <div className="product">
                        <img src={image7} alt="" />
                        <p>Macaron dress</p>
                    </div>
                    <div className="product">
                        <img src={image8} alt="" />
                        <p>Macaron dress</p>
                    </div>
                    <div className="product">
                        <img src={image9} alt="" />
                        <p>Sui Lieviti dress</p>
                    </div>
                </div>
            </RelatedProducts>
        </Container>
    );
};

export default Product;

const Container = styled(motion.section)`
    /* max-width: ${({ theme }) => theme.layout.maxWidth}; */
    position: relative;
    min-height: 100vh;
    width: 100%;
`;

const Content = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    max-width: ${({ theme }) => theme.layout.maxWidth};
    margin: 0 auto;
    gap: 7rem;

    .button {
        width: 100%;
        max-width: 290px;
        text-align: center;
        justify-content: center;
    }
`;

const Gallery = styled.section`
    img {
        object-fit: cover;
        height: 100%;
    }
`;

const ProductDetails = styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 100px;
`;

const Group = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
`;

const Row = styled.section`
    display: flex;
    gap: 1rem;
`;

const ProductStatus = styled.section`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    z-index: 99;
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
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    p a {
        margin-left: 0.5rem;
    }
    ul {
        display: flex;
    }
    li {
        margin-left: 0.5rem;
        &:first-child {
            margin-left: 0;
        }
        &.soldOut {
            color: ${({ theme }) => theme.color.lightGray};
        }
    }
`;

const Colors = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    & > section div {
        width: 15px;
        height: 15px;
        background-color: ${({ theme }) => theme.color.darkGreen};
        border-radius: 100px;
    }
`;

const RelatedProducts = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6rem 0;
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
            max-width: 300px;
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
`;
