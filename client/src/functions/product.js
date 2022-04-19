export const getSizes = (sizes) => {
    let returnSizes = [];
    sizes.forEach((size) => {
        size.selectedOptions.filter((option) => option.name === "Size").map((option) => returnSizes.push({ value: option.value, qty: size.quantityAvailable }));
        // size.selectedOptions.filter((option) => option.name === "Size").map((option) => (!returnSizes.some(({ value }) => value === option.value) ? returnSizes.push({ value: option.value, qty: size.quantityAvailable }) : null));
    });
    return returnSizes;
};

export const getColors = (colors) => {
    let returnColors = [];
    colors.forEach((color) => {
        const colorOptions = color.selectedOptions.filter((option) => option.name === "Color").map((option) => ({ name: option.value, qty: color.quantityAvailable }))[0];
        const colorValue = color.metafields.filter((option) => option.key === "color_codes").map((option) => option.value);

        if (!returnColors.some(({ name }) => name === colorOptions.name)) returnColors.push({ value: colorValue[0], ...colorOptions });
    });
    return returnColors;
};

export const arrayIsEqual = (a, b) => {
    if (a.length !== b.length) return false;
    const uniqueValues = new Set([...a, ...b]);
    for (const v of uniqueValues) {
        const aCount = a.filter((e) => e === v).length;
        const bCount = b.filter((e) => e === v).length;
        if (aCount !== bCount) return false;
    }
    return true;
};
