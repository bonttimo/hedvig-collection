import { useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import video from "../assets/display/hedvig.mp4";
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

    // useEffect(() => {
    //     iframe.current.addEventListener("load", () => {
    //         console.log("loaded");
    //     });
    // }, [iframe]);

    return (
        <Container className="page-home" initial="enter" animate="animate" exit="exit" variants={pageTransition}>
            <Header>
                <Video autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                </Video>
                {/* <Iframe>
                <iframe ref={iframe} title="The sisterhood reel" rel="noreferrer" src={`https://player.vimeo.com/video/663687557?autoplay=1&loop=1&background=1`}></iframe>
            </Iframe> */}
            </Header>
            <Intro>
                <div className="content">
                    <p className="text-large">Take me with you.</p>
                    <p className="text-large">Take me to the nicest people, to the loudest laughter, to the most intriguing conversations, to the most ravishing dance, to the most fascinating art! Take me with you through time, from the present to what-will-become.</p>
                    <Button url="/about" text="read our story" color="gray" />
                </div>
            </Intro>

            <ImageBlock color="offWhite" footer="DAIQUIRI silk & silk chiffon dress black">
                <ImageBlockItem image={image1} />
                <ImageBlockItem image={image2} title="Daiquiri — Silk Chiffon Dress Black" button="See more" url="/about" color="offWhite" />
            </ImageBlock>

            <ImageBlock color="offWhite" footer="Hedvig Knit merino wool sweater aniline">
                <ImageBlockItem image={image3} title="Hedvig Knit — Merino Wool Sweater Aniline" button="See more" url="/about" />
            </ImageBlock>

            <ImageBlock color="offWhite" footer="MACARON silk dress electric blue ">
                <ImageBlockItem image={image4} title="Macaron — Silk Dress Electric Blue" button="See more" url="/about" />
                <ImageBlockItem title="" body="Helsinki-based womenswear brand that values the beauty of enjoyment with a responsible approach to all we do." button="See more" url="/about" bg="darkPurple" style="left" />
            </ImageBlock>

            <ImageBlock color="offWhite" footer="MACARON silk dress plum">
                <ImageBlockItem image={image5} title="Macaron — Silk Dress Plum" button="See more" url="/about" color="offWhite" />
                <ImageBlockItem image={image6} />
            </ImageBlock>

            <ImageBlock color="offWhite" footer="Sui lieviti dress light blue">
                <ImageBlockItem image={image8} />
                <ImageBlockItem image={image7} title="Sui Lieviti — Dress Light Beige" button="See more" url="/about" color="offWhite" />
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
`;

const Header = styled.header`
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: relative;

    @media only screen and (max-width: 784px) {
        min-height: 50vh;
        max-height: 50vh;
    }
`;

const Video = styled.video`
    display: flex;
    width: 100%;
    height: 100%;
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
    padding: 3rem;
    .content {
        max-width: 45%;
        margin: 0 0 0 auto;

        p {
            margin-bottom: 1.5rem;
            line-height: 150%;
        }
    }

    @media only screen and (max-width: 784px) {
        .content {
            max-width: 100%;
        }
    }
`;
