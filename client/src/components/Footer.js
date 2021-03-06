import { Link } from "react-router-dom";
import styled from "styled-components";

import NewsletterAndContact from "./NewsletterAndContact";

const Footer = () => {
    return (
        <>
            <NewsletterAndContact />
            <Container>
                <Content>
                    <Item>
                        <Link className="h6" to="/privacy-policy">
                            Shipping &amp; Privacy
                        </Link>
                        {/* <h6>Returns & Privacy</h6> */}
                        <ul>
                            <li>
                                <Link className="hoverUnderline" to="/privacy-policy#shipping-privacy">
                                    Refund Policy
                                </Link>
                            </li>
                            <li>
                                <Link className="hoverUnderline" to="/privacy-policy#pre-order">
                                    Pre-Order
                                </Link>
                            </li>
                            <li>
                                <Link className="hoverUnderline" to="/privacy-policy#privacy-policy">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link className="hoverUnderline" to="/privacy-policy#terms-of-service">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link className="hoverUnderline" to="/privacy-policy#shipping-and-deliveries">
                                    Shipping & Deliveries
                                </Link>
                            </li>
                        </ul>
                    </Item>
                    <Item>
                        <h6>Follow us</h6>
                        <ul>
                            <li>
                                <a className="hoverUnderline" href="https://www.instagram.com/hedvigcollection" target="_blank" rel="noreferrer">
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </Item>
                    <Item>
                        <h6>Site</h6>
                        <ul>
                            <li>
                                <Link className="hoverUnderline" to="/shop">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link className="hoverUnderline" to="/about">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </Item>
                    <p className="copyright scto">?? Hedvig Collection {new Date().getFullYear()}. All rights reserved</p>
                </Content>
            </Container>
        </>
    );
};

export default Footer;

const Container = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.color.darkGreen};
    color: ${({ theme }) => theme.color.offWhite};
    width: 100%;
    height: auto;
    /* min-height: 200px; */
    padding: 5rem 0 0 0;

    .hoverUnderline:after {
        background-color: ${({ theme }) => theme.color.white};
    }

    .copyright {
        text-align: center;
        padding: 2.5rem 0;
        margin-top: 4.5rem;
        width: 100%;
        border-top: solid 1px ${({ theme }) => theme.color.lightGreen};
        color: ${({ theme }) => theme.color.lightGreen};
        grid-column: 1/-1;
    }

    .h6,
    .copyright {
        font-size: var(--text-smaller);
        font-family: var(--scto);
    }
    p,
    a {
        font-size: var(--text-small);
        font-family: var(--noeStandard);
    }

    .h6 {
        font-size: var(--h6);
    }

    @media only screen and (max-width: 900px) {
        .copyright {
            font-size: 0.625rem;
        }
    }
    @media only screen and (max-width: 784px) {
        padding: 2rem 0 0 0;
        .copyright {
            padding: 2rem 0 4rem 0;
            margin-top: 2rem;
        }
    }
`;

const Content = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto;
    width: 100%;
    max-width: var(--maxWidth);
    padding: 0 var(--gutter);
    padding-top: 2rem;

    @media only screen and (max-width: 784px) {
        grid-template-columns: 1fr;
        gap: 4rem;
    }
`;

const Item = styled.section`
    display: flex;
    flex-direction: column;

    h6,
    .h6 {
        color: ${({ theme }) => theme.color.lightGreen};
        margin-bottom: 2rem;
    }
    a {
        color: ${({ theme }) => theme.color.offWhite};
    }
    ul {
        list-style: none;

        li {
            margin-bottom: 0.5rem;
            &:last-of-type {
                margin-bottom: 0;
            }
        }
    }
`;
