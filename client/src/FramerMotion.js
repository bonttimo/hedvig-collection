const pageTransitionDuration = 1.2;
export const pageTransition = {
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
        transition: { duration: pageTransitionDuration - 0.7 },
    },
};

export const navigationSlide = {
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

export const mobileMenuSlide = {
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.2, ease: "circIn", staggerChildren: 0.03, delayChildren: 0.2 },
    },
    hidden: {
        opacity: 0,
        transition: { duration: 0.2, delay: 0.4, ease: "circIn", staggerChildren: 0.03, delayChildren: 0.2 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2, delay: 0.4, ease: "circIn", staggerChildren: 0.03, delayChildren: 0.2 },
    },
};

export const logoFade = {
    visible: { opacity: 1, transition: { duration: 0.4, delay: 0.2, ease: "circIn" } },
    hidden: { opacity: 0, transition: { duration: 0.3, ease: "circIn" } },
};

export const coockieFade = {
    visible: { opacity: 1, transition: { duration: 0.5, ease: "circIn" } },
    hidden: { opacity: 0, transition: { duration: 0.5, ease: "circIn" } },
    exit: { opacity: 0, transition: { duration: 0.5, ease: "circIn" } },
};

export const FadeIn = {
    start: { opacity: 0, transition: { duration: 0.4, ease: "circIn" } },
    end: { opacity: 1, transition: { duration: 0.4, ease: "circIn" } },
};

export const FadeInStagger = {
    start: { opacity: 0, transition: { duration: 0.4, ease: "circIn" } },
    end: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.4, delayChildren: 0.2, ease: "circIn" } },
};
