import styled from "styled-components";

import Button from "./Button";

const ProductItem = ({ style = "default", colors = [], sizes = {}, preorder = false, img = null, title = null, material = "", description = null, price = null, ...props }) => {
    return (
        <Container className={`component-product product-${style}`}>
            <Content>
                <Image>
                    <img src={img} alt="" />
                    <ProductData>
                        <header>
                            {preorder === true || (preorder === "true" && <p className="preOrder">Preorder</p>)}
                            {Object.values(sizes).every((size) => parseInt(size) <= 0) && <p className="soldOut">Sold out</p>}
                        </header>
                        <footer>
                            <div className="sizes">
                                <p>Sizes (EU):</p>
                                {Object.entries(sizes).map(([size, qty], index) => (
                                    <p key={index} className={qty <= 0 ? "soldOut" : ""}>
                                        {size}
                                    </p>
                                ))}
                            </div>

                            <div className="colors">
                                <p>Colours</p>
                                {colors.map((color, index) => (
                                    <div key={index} style={{ backgroundColor: color }}></div>
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
        </Container>
    );
};

export { ProductItem };

const Container = styled.section`
    display: flex;
    flex-direction: column;
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
    z-index: 99;
    color: ${({ theme }) => theme.color.black};

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
`;

const Body = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
`;
