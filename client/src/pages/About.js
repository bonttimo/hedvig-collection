import styled from "styled-components";
import { motion } from "framer-motion";

import { pageTransition } from "../FramerMotion";

const About = () => {
    return (
        <Container className="page-about" initial="enter" animate="animate" exit="exit" variants={pageTransition}>
            <Content>
                <Aside>
                    <Links className="desktop">
                        <h6 className="scto">Contact</h6>
                        <a className="noeStandard" href="mailto:info@hedvigcollection.com" target="_blank" rel="noreferrer">
                            info@hedvigcollection.com
                        </a>
                        <a className="noeStandard" href="https://www.instagram.com/hedvigcollection">
                            Instagram
                        </a>
                    </Links>

                    {/* <div className="owners">
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
                    </div> */}
                </Aside>
                <Main>
                    <Links className="mobile">
                        <h6>Contact</h6>
                        <a className="noeStandard" href="mailto:info@hedvigcollection.com">
                            info@hedvigcollection.com
                        </a>
                        <a className="noeStandard" href="https://www.instagram.com/hedvigcollection" target="_blank" rel="noreferrer">
                            Instagram
                        </a>
                    </Links>
                    <div className="intro">
                        <h6 className="scto">Fragments of Short Stories</h6>
                        <p>
                            <strong>SOFIA JÄRNEFELT</strong> and <strong>TARU LAHTI</strong> met when working together in a team under a Swedish creative director. Together they learned to carefully prepare ideas and implement them as coherent products. During this shared experience they found a mutual perception of beauty, and a passion for extraordinary fabrics, sophisticated aesthetics, and peculiar stories. They became friends. Or more like sisters – the kind that complete each others' sentences and feel confident and safe to express opposing opinions to each other.
                        </p>
                    </div>
                    <div className="item">
                        <p>HEDVIG was founded by Sofia and Taru in 2021 and is based in Helsinki. It all started as Sofia’s art project inspired by both of her grandmothers' backgrounds: one a baroness from a prestigious family, the other a woman from the rugged cliffs of the outer archipelago of Åland. The peculiar stories from her family’s history turned out to be an intriguing visual story to tell and build upon. </p>

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
    min-height: auto;
    background-color: ${({ theme }) => theme.color.offWhite};
    display: flex;
    flex-direction: column;
    margin-top: var(--offsetTop);

    aside {
        a {
            font-size: var(--text-medium);
        }
    }

    .intro {
        p {
            font-size: var(--text-big);
        }
        p,
        a {
            font-family: var(--noeStandard);
        }
    }

    main {
        p {
            font-family: var(--scto);
        }
    }

    @media only screen and (max-width: 900px) {
        h6 {
            font-size: 0.75rem;
        }
        a {
            font-size: var(--text-huge);
        }

        .intro {
            p {
                font-size: var(--text-huge);
            }
        }
    }
`;

const Content = styled.section`
    max-width: var(--maxWidth);
    padding: 0 var(--gutter);
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 9rem;

    @media only screen and (max-width: 784px) {
        grid-template-columns: 1fr;
    }
`;

const Aside = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .owners {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: auto;
        gap: 4rem;

        margin-top: 6rem;
        img {
            margin-bottom: 0.6rem;
            max-width: 200px;
        }
    }

    @media only screen and (max-width: 784px) {
        order: 2;
        .owners {
            margin-top: 3rem;
            img {
                max-width: 100%;
            }
        }
    }
`;

const Links = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &.mobile {
        display: none;
    }
    @media only screen and (max-width: 784px) {
        grid-template-columns: 1fr;
        &.mobile {
            display: flex;
            margin-bottom: 6rem;
        }
        &.desktop {
            display: none;
        }
    }
`;

const Main = styled.main`
    justify-self: end;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    column-gap: 7rem;

    .intro {
        grid-column: 1/3;
        margin-bottom: 2.5rem;
    }
    h6 {
        margin-bottom: 0.6rem;
        text-transform: uppercase;
    }
    p {
        position: relative;
        display: block;
        margin-bottom: 1.5rem;
    }

    @media only screen and (max-width: 784px) {
        grid-template-columns: 1fr;
        .intro {
            grid-column: 1;
        }
    }
`;
