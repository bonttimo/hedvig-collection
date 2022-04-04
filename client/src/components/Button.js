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

const Container = styled.section`
    display: flex;
    align-items: center;

    a {
        margin-left: 0.7rem;
        color: ${({ theme, color }) => theme.color[color]};
        text-transform: uppercase;
        font-size: 0.7rem;
    }
    span {
        width: 9px;
        height: 9px;
        background-color: ${({ theme, color }) => theme.color[color]};
        border-radius: 100px;
    }

    &.style- {
        &fill {
            padding: 1.5rem 3rem;
            background-color: ${({ theme, bg }) => theme.color[bg]};
            span {
                display: none;
            }
        }
        &outline {
            padding: 1.5rem 3rem;
            border: solid 1px ${({ theme, bg }) => theme.color[bg]};
            span {
                display: none;
            }
        }
    }
`;
