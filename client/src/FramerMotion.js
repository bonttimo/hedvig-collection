const pageTransitionDuration = 0.7;
const pageTransition = {
    animate: {
        opacity: 1,
        transition: { duration: pageTransitionDuration },
    },
    enter: {
        opacity: 0,
        transition: { duration: pageTransitionDuration },
    },
    exit: {
        opacity: 0,
        transition: { duration: pageTransitionDuration },
    },
};

const navigationSlide = {
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "circOut" },
    },
    hidden: {
        opacity: 0,
        y: -180,
        transition: { duration: 0.4, ease: "circIn" },
    },
};

const logoFade = {
    visible: { opacity: 1, transition: { duration: 0.4, delay: 0.4, ease: "circIn" } },
    hidden: { opacity: 0, transition: { duration: 0.4, ease: "circIn" } },
};

export { pageTransition, navigationSlide, logoFade };
