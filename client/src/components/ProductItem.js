import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

import { FadeIn } from "../FramerMotion";
import { getSizes, getColors } from "../functions/product";

const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children);

const ProductItem = ({ style = "default", colors = [], sizes = {}, preorder = false, img = null, preview = null, title = null, material = "", description = null, price = null, url = "", ...props }) => {
    const _sizes = getSizes(sizes, true);
    const _colors = getColors(colors);
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
                        <div className="img">
                            <img loading="lazy" src={img} alt={title} style={{ backgroundColor: _colors[0].value }} />

                            <ProductData className="product-data">
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
                                    {material !== "" && (
                                        <div className="material">
                                            <p>Material: {material}</p>
                                        </div>
                                    )}
                                </footer>
                            </ProductData>
                        </div>
                    </Image>
                    <Body>
                        <h3 className="title">{title}</h3>
                        <div className="group">
                            <p className="description">{description}</p>
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

    .sizes,
    .colors,
    .material {
        a,
        p {
            font-size: var(--text-smaller);
        }
    }
    p.description,
    p.price {
        font-size: var(--text-smaller);
    }

    @media only screen and (max-width: 1400px) {
        h3.title {
            font-size: var(--text-medium);
        }
    }
    @media only screen and (max-width: 900px) {
        h3.title {
            font-size: var(--text-huge);
        }

        .sizes,
        .colors,
        .material {
            a,
            p {
                font-size: var(--text-tiny);
            }
        }

        p.description,
        p.price,
        .material {
            font-size: var(--text-tiny);
        }
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

    .img {
        /* padding-top: 177%; 19/16 */
        padding-top: 140%;
        height: 0;
    }
    img {
        position: absolute;
        top: 0;
    }

    &:hover {
        .product-data {
            opacity: 1;
        }
    }

    @media only screen and (max-width: 784px) {
        .img {
            display: flex;
            flex-direction: column;
            padding-top: 0;
            height: auto;
        }
        img {
            position: relative;
        }
    }
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
    transition: opacity 400ms ease;
    opacity: 0;

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
        flex-wrap: wrap;
        gap: 0.1rem 1rem;
        padding: 1rem;

        .colors,
        .sizes,
        .material {
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

    @media only screen and (max-width: 784px) {
        position: relative;
        align-items: center;
        opacity: 1;
        height: auto;
        footer {
            gap: 0.1rem 0.5rem;
            padding: 0.5rem;
            .sizes,
            .colors,
            .material {
                display: flex;
            }
        }
    }
`;

const Body = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    margin-top: 2rem;
    height: 100%;

    .title {
        margin-bottom: 1rem;
    }
    .group {
        display: flex;
        justify-content: center;
        align-items: baseline;
        gap: 1rem;
        .price {
            flex-wrap: nowrap;
        }
        span {
            background-color: ${({ theme }) => theme.color.gray};
            width: 1px;
            height: 7px;
        }
        .description {
            text-transform: uppercase;
        }
    }

    @media only screen and (max-width: 1100px) {
        margin-top: 1rem;
        .group {
            gap: 0.4rem;
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
        margin-top: 0.5rem;

        .group {
            .price,
            span,
            .description {
                display: flex;
            }
        }
    }
`;
