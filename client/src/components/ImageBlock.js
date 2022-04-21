import { Children } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { FadeIn } from "../FramerMotion";
import Button from "./Button";

const ImageBlockItem = ({ image = null, title = null, body = null, style = "center", button = null, url = null, color = "offWhite", bg = "darkPurple", ...props }) => {
    return (
        <Item className={`component-imageBlockItem style-${style} ${body ? "has-content" : ""}`} color={color} bg={bg} initial="start" animate="end" variants={FadeIn}>
            {image && <img loading="lazy" src={image} alt="" />}
            <div className={`content ${image ? "content-absolute" : ""}`}>
                {title && <h3>{title}</h3>}
                {body && <p className="body text-large">{body}</p>}
                {button && <Button url={url} text={button} color={color} />}
            </div>
        </Item>
    );
};

const ImageBlock = ({ children, footer = null, bg = "offWhite", color = "offWhite", style = "default", ...props }) => {
    return (
        <Container className={`component-imageBlock imageBlock-${style}`} initial="start" animate="end" variants={FadeIn}>
            <Content color={color} columns={Children.count(children)}>
                {children}
            </Content>
            {footer && (
                <Footer className="text-details">
                    <h6 className="scto">{footer}</h6>
                </Footer>
            )}
        </Container>
    );
};

export { ImageBlock, ImageBlockItem };

const Container = styled(motion.section)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Content = styled.section`
    display: grid;
    grid-template-columns: repeat(${({ columns }) => (columns < 0 ? 1 : columns)}, 1fr);
    grid-auto-rows: 1fr;
    align-content: center;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;

    @media only screen and (max-width: 784px) {
        display: flex;
        flex-direction: column;
        max-height: unset;
        height: auto;
    }
`;

const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.color.offWhite};
    padding: 2rem;
`;

const Item = styled(motion.section)`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${({ theme, color }) => theme.color[color]};
    background-color: ${({ theme, bg }) => theme.color[bg]};
    height: 100%;

    &.has-content {
        .content {
            width: 100%;
            max-width: 500px;
            .body {
                margin-bottom: 2rem;
            }
        }
    }
    &.style- {
        &center {
            justify-content: center;
            align-items: center;
            text-align: center;
            .content {
                align-items: center;
            }
        }
        &left {
            text-align: left;
            .content {
                align-items: left;
                button {
                    justify-content: flex-start;
                }
            }
        }
    }

    img {
        display: flex;
        height: 100%;
        object-fit: cover;
    }

    .content {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    @media only screen and (max-width: 784px) {
        .content {
            display: flex;
            flex-direction: column;
            position: relative;
            padding: 3rem;

            &-absolute {
                position: absolute;
            }
        }
        &.has-content {
            .content {
                max-width: 100%;
            }
        }
    }
`;
