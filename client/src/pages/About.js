import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import image from "../assets/display/Hedvig-2021_82.jpg";

import { pageTransition } from "../FramerMotion";

const About = () => {
    return (
        <Container className="page-about" initial="enter" animate="animate" exit="exit" variants={pageTransition}>
            <Content>
                <Aside>
                    <div className="links">
                        <h6>Contact</h6>
                        <Link className="h3 noeStandard" to="mailto:info@hedvigcollection.com">
                            info@hedvigcollection.com
                        </Link>
                        <Link className="h3 noeStandard" to="https://www.instagram.com/">
                            Instagram
                        </Link>
                    </div>

                    <div className="owners">
                        <div className="item">
                            <img src={image} alt="" />
                            <h6>Creative Director</h6>
                            <p>Sofia Järnefelt</p>
                        </div>
                        <div className="item">
                            <img src={image} alt="" />
                            <h6>Creative Director</h6>
                            <p>Taru Lahti</p>
                        </div>
                    </div>
                </Aside>
                <Main>
                    <div className="intro">
                        <h6>Fragments of Short Stories</h6>
                        <p>
                            <strong>SOFIA JÄRNEFELT</strong> and <strong>TARU LAHTI</strong> met when working together in a team under a Swedish creative director. Together they learned to carefully prepare ideas and implement them as coherent products. During this shared experience they found a mutual perception of beauty, and a passion for extraordinary fabrics, sophisticated aesthetics, and peculiar stories. They became friends. Or more like sisters – the kind that complete each others' sentences and feel confident and safe to express opposing opinions to each other.
                        </p>
                    </div>
                    <div className="item">
                        <p>HEDVIG was founded by Sofia and Taru in 2021 and is based in Helsinki. It all started as Sofia’s art project inspired by both of her grandmothers' backgrounds: one from the Russian court of the Tsarists period, the other a woman from the rugged cliffs of the outer archipelago of Åland. The peculiar stories from her family’s history turned out to be an intriguing visual story to tell and build upon. </p>

                        <p>When our creative director’s grandmother and grandfather met for the first time it was in 1928 at a ball in the House of Nobility. Their names were Irma and Gustaf. Others told Irma not to talk to Gustaf, saying he was a crazy scientist, a lunatic astronomer who believed one day man would fly to the moon. “He believes man will fly to the moon? How fascinating!”, Irma sighed and walked up to Gustaf. </p>
                        <p>They lived in the observatory. And in their home there was a ghost, an old professor who used to live there before them. They thought he was in love with their daughter, a young woman at the time, because the perfume bottles in her room used to fall when she wasn’t there.</p>
                    </div>
                    <div className="item">
                        <p>Gustaf’s aunt, the colorist Sigrid Schaumann, used to sit in the gardens of the observatory and paint, have a sip of Vermouth and explain that the reason for her traveling to Central Europe was to develop herself as a painter. “One has to think about one's future” she said, at the age of 74. </p>
                        <p>HEDVIG is an incarnation of ancestors. A figure who travels between the past, the present and the what-will-become. Wherever there is the tastiest drink. The loudest laughter. The most marvelous dancing. The most intriguing discussions. The most fascinating art. And the nicest people.</p>
                        <p>Crafted with care of the finest materials available. Designed to endure for many years to come. With responsible choices at our core, HEDVIG offers multi-purposed garments to be with you wherever you may go. Transcending trends with a well-curated wardrobe that we build over time and with moderate consideration in mind. </p>
                    </div>
                </Main>
            </Content>
        </Container>
    );
};

export default About;

const Container = styled(motion.section)`
    min-height: 100vh;
    background-color: ${({ theme }) => theme.color.offWhite};
    display: flex;
    flex-direction: column;
    margin-top: ${({ theme }) => theme.layout.offsetTop};
`;

const Content = styled.section`
    max-width: ${({ theme }) => theme.layout.maxWidth};
    padding: 0 ${({ theme }) => theme.layout.gutter};
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-left: auto;
    margin-right: auto;
`;

const Aside = styled.aside`
    display: flex;
    flex-direction: column;
    .links {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .owners {
        margin-top: 6rem;
        display: flex;
        flex-direction: column;
        gap: 4rem;
        img {
            margin-bottom: 0.6rem;
            max-width: 200px;
        }
    }
`;

const Main = styled.main`
    justify-self: end;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    column-gap: 3rem;

    .intro {
        grid-column: 1/3;
        margin-bottom: 2rem;
    }
    h6 {
        margin-bottom: 0.6rem;
    }
    p {
        position: relative;
        display: block;
        margin-bottom: 3rem;
    }
`;
