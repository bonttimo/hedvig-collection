import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = ({ url, text, color = "offWhite", bg = "transparent", style = "default", onClick = null, disabled = false, internal = true }) => {
    return (
        <Container onClick={onClick} disabled={disabled} className={`button style-${style}`} color={color} bg={bg}>
            <span></span>
            {internal ? <Link to={url}>{text}</Link> : <a href={url}>{text}</a>}
        </Container>
    );
};

export default Button;

const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    a {
        margin-left: 0.7rem;
        color: ${({ theme, color }) => theme.color[color]};
        text-transform: uppercase;
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
                padding: 1.3rem 3rem;
                background-color: ${({ theme, bg }) => theme.color[bg]};
            }
            span {
                display: none;
            }
        }
        &outline {
            a {
                margin-left: 0;
                width: 100%;
                text-align: center;
                padding: 1.5rem 3rem;
                border: solid 1px ${({ theme, bg }) => theme.color[bg]};
            }
            span {
                display: none;
            }
        }
    }

    &:disabled {
        a {
            cursor: not-allowed;
            background-color: ${({ theme, bg }) => theme.color.gray};
        }
    }

    @media only screen and (max-width: 784px) {
        justify-content: start;
    }
`;
