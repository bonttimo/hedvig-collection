import { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import video from "../assets/display/hedvig-intro-video.mp4";
import Button from "../components/Button";
import { ImageBlock, ImageBlockItem } from "../components/ImageBlock";

import image1 from "../assets/display/4A6A0151-2-1.jpg";
import image2 from "../assets/display/Hedvig-2021_12-1.jpg";
import image3 from "../assets/display/Hedvig-2021_10-1.jpg";
import image4 from "../assets/display/Hedvig-2021_18-1.jpg";
import image5 from "../assets/display/Hedvig-2021_20-1.jpg";
import image6 from "../assets/display/4A6A9938-1.jpg";

import image7 from "../assets/display/Hedvig-2021_3-2.jpg";
import image8 from "../assets/display/4A6A9923-3-1.jpg";
import image9 from "../assets/display/4A6A1036-1.jpg";

import { pageTransition } from "../FramerMotion";

//https://betterprogramming.pub/framer-motion-tutorials-make-more-advanced-animations-4344b686ea0a

const Home = () => {
    const iframe = useRef("");
    const videoElm = useRef(null);

    // useEffect(() => {
    //     iframe.current.addEventListener("load", () => {
    //         console.log("loaded");
    //     });
    // }, [iframe]);

    const toggleSound = (e) => {
        e.preventDefault();
        e.target.closest(".controls").querySelector(".active").classList.remove("active");
        e.target.classList.toggle("active");
        if (e.target.dataset.sound === "on") {
            videoElm.current.volume = 0.45;
            videoElm.current.muted = false;
        } else {
            videoElm.current.muted = true;
        }
    };

    return (
        <Container className="page-home" initial="enter" animate="animate" exit="exit" variants={pageTransition}>
            <Header>
                <Video ref={videoElm} autoPlay loop muted playsInline height="100vh">
                    <source src={video} type="video/mp4" />
                </Video>
                {/* <Iframe>
                <iframe ref={iframe} title="The sisterhood reel" rel="noreferrer" src={`https://player.vimeo.com/video/663687557?autoplay=1&loop=1&background=1`}></iframe>
            </Iframe> */}
                <div className="controls">
                    <p>Sound</p>
                    <span data-sound="on" onClick={toggleSound}>
                        On
                    </span>
                    <span>/</span>
                    <span data-sound="off" className="active" onClick={toggleSound}>
                        Off
                    </span>
                </div>
            </Header>
            <Intro className="intro">
                <div className="content">
                    <p>Take me with you.</p>
                    <p>Take me to the nicest people, to the loudest laughter, to the most intriguing conversations, to the most ravishing dance, to the most fascinating art! Take me with you through time, from the present to what-will-become.</p>
                    <Button url="/about" text="read our story" color="darkGray" internal={true} />
                </div>
            </Intro>

            <ImageBlock color="offWhite" footer="DAIQUIRI silk & silk chiffon dress black">
                <ImageBlockItem image={image1} />
                <ImageBlockItem image={image2} title="Silk & Silk Chiffon Dress Black" button="See more" url="/product/daiquiri-silk-silk-chiffon-dress-black" color="offWhite" />
            </ImageBlock>

            <ImageBlock color="offWhite" footer="Hedvig Knit merino wool sweater aniline">
                <ImageBlockItem image={image3} title="Hedvig Knit — Merino Wool Sweater Aniline" button="See more" url="/product/hedvig-knit-merino-wool-sweater-aniline" />
            </ImageBlock>

            <ImageBlock color="offWhite" footer="MACARON silk dress electric blue ">
                <ImageBlockItem image={image4} title="Macaron — Silk Dress Electric Blue" button="See more" url="/product/macaron-silk-dress-electric-blue" />
                <ImageBlockItem title="" body="Helsinki-based womenswear brand that values the beauty of enjoyment with a responsible approach to all we do." button="See more" url="/about" bg="darkPurple" style="left" />
            </ImageBlock>

            <ImageBlock color="offWhite" footer="MACARON silk dress plum">
                <ImageBlockItem image={image5} title="Macaron — Silk Dress Plum" button="See more" url="/product/macaron-silk-dress-plum" color="offWhite" />
                <ImageBlockItem image={image6} />
            </ImageBlock>

            <ImageBlock color="offWhite" footer="Sui Lieviti Dress Light Beige">
                <ImageBlockItem image={image8} />
                <ImageBlockItem image={image7} title="Sui Lieviti — Dress Light Beige" button="See more" url="/product/sui-lieviti-dress-light-beige" color="offWhite" />
            </ImageBlock>

            <ImageBlock color="offWhite">
                <ImageBlockItem image={image9} />
            </ImageBlock>
        </Container>
    );
};

export default Home;

const Container = styled(motion.section)`
    position: relative;
    min-height: 100vh;
    width: 100%;
    background-color: ${({ theme }) => theme.color.offWhite};

    .intro {
        p {
            margin-bottom: 1.5rem;
            line-height: 150%;
            font-size: var(--text-huge);
        }
        button a {
            font-size: var(--text-small);
        }
    }

    .controls {
        p,
        span {
            font-size: var(--text-small);
            font-family: var(--scto);
        }
    }

    @media only screen and (max-width: 900px) {
        .intro {
            button a {
                font-size: var(--text-tiny);
            }
        }
        .controls {
            p,
            span {
                font-size: var(--text-tiny);
            }
        }
    }
`;

const Header = styled.header`
    display: flex;
    width: 100%;
    height: 100%;
    max-height: 55vh;
    min-height: 850px;
    position: relative;

    .controls {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        align-items: baseline;
        color: ${({ theme }) => theme.color.offWhite};
        margin: 2rem;
        text-transform: uppercase;

        p {
            margin-right: 1rem;
        }
        span {
            padding: 0 0.2rem;
            color: ${({ theme }) => theme.color.gray};
            transition: color 300ms ease;
            cursor: pointer;

            &:hover,
            &.active {
                color: ${({ theme }) => theme.color.offWhite};
            }
        }
    }

    @media only screen and (max-width: 784px) {
        max-height: 50vh;
        min-height: 70vh;

        .controls {
            margin: 1rem;
        }
    }
`;

const Video = styled.video`
    display: flex;
    width: 100%;
    height: auto;
    object-fit: cover;
    position: relative;
    min-height: inherit;
`;

const Iframe = styled.section`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
    & iframe {
        width: 100vw;
        height: 56.25vw;
        min-height: 100vh;
        min-width: 177.77vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: none;
        z-index: 99;
    }
`;

const Intro = styled.section`
    padding: 6rem 10rem 6rem 2rem;
    .content {
        max-width: 63%;
        margin: 0 0 0 auto;

        p:first-child {
            margin-bottom: 3rem;
        }
    }

    @media only screen and (max-width: 784px) {
        padding: 7rem 2rem;
        .content {
            max-width: 100%;
        }
    }
`;
