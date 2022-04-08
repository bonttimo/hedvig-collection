export const getProducts = (limit = 40) => {
    return window.client.graphQLClient.query((root) => {
        root.addConnection("products", { args: { first: limit } }, (product) => {
            product.add("title");
            product.add("handle");
            product.add("availableForSale");
            product.add("descriptionHtml");
            product.addConnection("images", { args: { first: limit } }, (image) => {
                image.add("src");
                image.add("url");
                image.add("width");
            });
            product.addConnection("metafields", { args: { first: limit } }, (metafield) => {
                metafield.add("namespace");
                metafield.add("key");
                metafield.add("value");
            });
            product.addConnection("variants", { args: { first: limit } }, (variant) => {
                variant.add("title");
                variant.add("price");
                variant.add("quantityAvailable");
                variant.add("sku");
                variant.add("image", (image) => {
                    image.add("src");
                    image.add("url");
                    image.add("width");
                });
                variant.add("selectedOptions", (options) => {
                    options.add("name");
                    options.add("value");
                });
                variant.addConnection("metafields", { args: { first: limit } }, (metafield) => {
                    metafield.add("namespace");
                    metafield.add("key");
                    metafield.add("value");
                });
            });
        });
    });
};

export const getSingleProduct = (id) => {
    return window.client.graphQLClient.query((root) => {
        root.addConnection("products", { args: { first: 30, query: `${id}` } }, (product) => {
            product.add("title");
            product.add("handle");
            product.add("availableForSale");
            product.add("descriptionHtml");
            product.addConnection("images", { args: { first: 20 } }, (image) => {
                image.add("src");
                image.add("url");
                image.add("width");
            });
            product.addConnection("metafields", { args: { first: 20 } }, (metafield) => {
                metafield.add("namespace");
                metafield.add("key");
                metafield.add("value");
            });
            product.addConnection("variants", { args: { first: 20 } }, (variant) => {
                variant.add("title");
                variant.add("price");
                variant.add("quantityAvailable");
                variant.add("sku");
                variant.add("image", (image) => {
                    image.add("src");
                    image.add("url");
                    image.add("width");
                });
                variant.add("selectedOptions", (options) => {
                    options.add("name");
                    options.add("value");
                });
                variant.addConnection("metafields", { args: { first: 20 } }, (metafield) => {
                    metafield.add("namespace");
                    metafield.add("key");
                    metafield.add("value");
                });
            });
        });
    });
};

export const getRandomProducts = (limit = 6, id = "") => {
    return window.client.graphQLClient.query((root) => {
        root.addConnection("products", { args: { first: limit, query: `-${id}` } }, (product) => {
            product.add("title");
            product.add("handle");
            product.addConnection("images", { args: { first: limit } }, (image) => {
                image.add("src");
                image.add("url");
                image.add("width");
            });
        });
    });
};
