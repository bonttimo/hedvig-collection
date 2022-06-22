// https://shopify.dev/graphiql/storefront-graphiql
// https://www.codeshopify.com/blog_posts/the-easy-way-to-do-the-shopify-storefront-api-graphql-with-fetch

export const getProducts = (limit = 40) => {
    return window.client.graphQLClient.query((root) => {
        root.addConnection("products", { args: { first: limit } }, (product) => {
            product.add("title");
            product.add("handle");
            product.add("availableForSale");
            product.add("descriptionHtml");
            product.addConnection("images", { args: { first: limit } }, (image) => {
                image.add("src");
                image.add("url", { args: { transform: { maxHeight: 800 } } });

                // smallImage: transformedSrc(maxWidth: 200, crop: CENTER)
                // bigImage: transformedSrc(maxWidth: 400, crop: CENTER)

                image.add("width");
                image.add("height");
                image.add("altText");
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
                    image.add("altText");
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
                image.add("url", { args: { transform: { maxHeight: 1500 } } });
                image.add("width");
                image.add("height");
                image.add("altText");
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
                image.add("url", { args: { transform: { maxHeight: 600 } } });
                image.add("width");
                image.add("height");
                image.add("altText");
            });
        });
    });
};
