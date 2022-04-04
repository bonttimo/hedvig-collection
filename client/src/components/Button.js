import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = ({ url, text, color = "offWhite", style = "default" }) => {
    return (
        <Container className={`button button-${style}`} color={color}>
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
    }
    span {
        width: 9px;
        height: 9px;
        background-color: ${({ theme, color }) => theme.color[color]};
        border-radius: 100px;
    }
`;
