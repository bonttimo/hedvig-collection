import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = ({ url, text, color = "offWhite", bg = "transparent", style = "default" }) => {
    return (
        <Container className={`button style-${style}`} color={color} bg={bg}>
            <span></span>
            <Link to={url}>{text}</Link>
        </Container>
    );
};

export default Button;

const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        margin-left: 0.7rem;
        color: ${({ theme, color }) => theme.color[color]};
        text-transform: uppercase;
        font-size: 0.7rem;
        text-decoration: none;
    }
    span {
        width: 9px;
        height: 9px;
        background-color: ${({ theme, color }) => theme.color[color]};
        border-radius: 100px;
    }

    &.style- {
        &fill {
            a {
                margin-left: 0;
                width: 100%;
                text-align: center;
            }
            padding: 1.5rem 3rem;
            background-color: ${({ theme, bg }) => theme.color[bg]};
            span {
                display: none;
            }
        }
        &outline {
            a {
                margin-left: 0;
                width: 100%;
                text-align: center;
            }
            padding: 1.5rem 3rem;
            border: solid 1px ${({ theme, bg }) => theme.color[bg]};
            span {
                display: none;
            }
        }
    }

    @media only screen and (max-width: 784px) {
        justify-content: start;
    }
`;
