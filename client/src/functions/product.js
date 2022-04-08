export const getSizes = (sizes) => {
    let returnSizes = [];
    sizes.forEach((size) => {
        size.selectedOptions.filter((option) => option.name === "Size").map((option) => returnSizes.push({ value: option.value, qty: size.quantityAvailable }));
    });
    return returnSizes;
};

export const getColors = (colors) => {
    let returnColors = [];
    colors.forEach((size) => {
        size.metafields.filter((option) => option.key === "color_codes").map((option) => (!returnColors.some(({ value }) => value === option.value) ? returnColors.push({ value: option.value, qty: size.quantityAvailable }) : null));
    });

    return returnColors;
};
