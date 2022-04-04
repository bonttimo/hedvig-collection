import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = ({ url, text, color = "offWhite", style = "default" }) => {
    return (
        <Container>
            <Content>
                <Item>
                    <h6>Returns & Privacy</h6>
                    <ul>
                        <li>
                            <Link to="/privacy-policy#shipping-privacy">Refund Policy</Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy#pre-order">Pre-Order</Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy#privacy-policy">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy#terms-of-service">Terms of Service</Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy#shipping-and-deliveries">Shipping & Deliveries</Link>
                        </li>
                    </ul>
                </Item>
                <Item>
                    <h6>Follow us</h6>
                    <ul>
                        <li>
                            <Link to="/">Instagram</Link>
                        </li>
                        <li>
                            <Link to="/">Facebook</Link>
                        </li>
                        <li>
                            <Link to="/">Linkedin</Link>
                        </li>
                    </ul>
                </Item>
                <Item>
                    <h6>Site</h6>
                    <ul>
                        <li>
                            <Link to="/">Shop</Link>
                        </li>
                        <li>
                            <Link to="/">About</Link>
                        </li>
                    </ul>
                </Item>
                <p className="copyright">© Hedvig Collection 2022. All rights reserved</p>
            </Content>
        </Container>
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
    min-height: 200px;
    padding: 5rem 0 0 0;

    .copyright {
        text-align: center;
        padding: 8rem 0 4rem 0;
        margin-top: 8rem;
        width: 100%;
        border-top: solid 1px ${({ theme }) => theme.color.lightGreen};
        color: ${({ theme }) => theme.color.lightGreen};
        grid-column: 1/-1;
    }
`;

const Content = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto;
    width: 100%;
    max-width: ${({ theme }) => theme.layout.maxWidth};
    padding: 0 ${({ theme }) => theme.layout.gutter};
    padding-top: 2rem;
`;

const Item = styled.section`
    display: flex;
    flex-direction: column;

    h6 {
        color: ${({ theme }) => theme.color.lightGreen};
        margin-bottom: 2rem;
    }
    ul {
        list-style: none;

        li {
            margin-bottom: 1rem;
            &:last-of-type {
                margin-bottom: 0;
            }
        }
    }
`;
