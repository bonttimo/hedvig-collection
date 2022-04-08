import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

import { FadeIn } from "../FramerMotion";
import { getSizes, getColors } from "../functions/product";

const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children);

const ProductItem = ({ style = "default", colors = [], sizes = {}, preorder = false, img = null, title = null, material = "", description = null, price = null, url = "", ...props }) => {
    const _sizes = getSizes(sizes);
    const _colors = getColors(colors);
    console.log(_colors);
    return (
        <Container className={`component-product product-${style}`} initial="start" animate="end" variants={FadeIn}>
            <ConditionalWrapper
                condition={url}
                wrapper={(children) => (
                    <Link to={url} className="permalink">
                        {children}
                    </Link>
                )}>
                <Content>
                    <Image>
                        <img loading="lazy" src={img} alt="" />
                        <ProductData>
                            <header>
                                {preorder === true || (preorder === "true" && <p className="preOrder">Preorder</p>)}
                                {Object.values(sizes).every((size) => parseInt(size) <= 0) && <p className="soldOut">Sold out</p>}
                            </header>
                            <footer>
                                <div className="sizes">
                                    <p>Sizes (EU):</p>
                                    {Object.values(_sizes).map(({ value, qty }, index) => (
                                        <p key={index} className={qty <= 0 ? "soldOut" : ""}>
                                            {value}
                                        </p>
                                    ))}
                                </div>

                                <div className="colors">
                                    <p>Colours</p>
                                    {Object.values(_colors).map(({ value, qty }, index) => (
                                        <div key={index} style={{ backgroundColor: value }}></div>
                                    ))}
                                </div>
                                {material !== "" && <p className="material">Material: {material}</p>}
                            </footer>
                        </ProductData>
                    </Image>
                    <Body>
                        <h3 className="title">{title}</h3>
                        <div className="group">
                            <p className="discription">{description}</p>
                            <span> </span>
                            <p className="price">{price} €</p>
                        </div>
                    </Body>
                </Content>
            </ConditionalWrapper>
        </Container>
    );
};

export { ProductItem };

const Container = styled(motion.section)`
    display: flex;
    flex-direction: column;
    height: 100%;

    .permalink {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
`;

const Content = styled.section`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
`;

const Image = styled.section`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

const ProductData = styled.section`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    color: ${({ theme }) => theme.color.darkGray};

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-transform: uppercase;
        .preOrder {
            padding: 1rem;
            margin: 0 auto 0 0;
        }
        .soldOut {
            padding: 1rem 2rem;
            background-color: ${({ theme }) => theme.color.darkGreen};
            color: ${({ theme }) => theme.color.offWhite};
            margin: 0 0 0 auto;
        }
    }

    footer {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;

        .colors,
        .sizes {
            display: flex;
            justify-content: center;
            align-items: baseline;
            gap: 0.3rem;
            .soldOut {
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
    }

    @media only screen and (max-width: 1400px) {
        footer {
            .sizes {
                display: none;
            }
        }
    }
    @media only screen and (max-width: 1100px) {
        footer {
            .colors {
                display: none;
            }
        }
    }
    @media only screen and (max-width: 784px) {
        footer {
            .sizes,
            .colors {
                display: flex;
            }
        }
    }
`;

const Body = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: baseline;
    margin-top: 2rem;

    .title {
        margin-bottom: 1rem;
    }
    .group {
        display: flex;
        justify-content: center;
        align-items: baseline;
        gap: 1rem;

        span {
            background-color: ${({ theme }) => theme.color.gray};
            width: 1px;
            height: 7px;
        }
        .discription {
            text-transform: uppercase;
        }
    }

    @media only screen and (max-width: 924px) {
        .group {
            .price,
            span {
                display: none;
            }
        }
    }

    @media only screen and (max-width: 784px) {
        margin-top: 1rem;
    }
`;
