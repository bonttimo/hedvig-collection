import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { ImageBlock, ImageBlockItem } from "../components/ImageBlock";
import ProductGallery from "../components/ProductGallery";

import image4 from "../assets/display/Screenshot-2022-02-20-at-12-14-1.jpg";
import image5 from "../assets/display/Screenshot-2022-02-20-at-12-13-1.jpg";

import { pageTransition } from "../FramerMotion";

const Shop = () => {
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);

    const STOREFRONT_ACCESS_TOKEN = "d9ee0ec8a4c50211b45c57b6042e215d";
    const GRAPHQL_URL = "https://hedvig-collection.myshopify.com/api/2022-04/graphql.json";

    const fetchProducts = async (limit = 20) => {
        const productQuery = `{
            products(first: ${limit}) {
                nodes {
                    title
                    availableForSale
                    descriptionHtml
                    id
                    handle

                    images(first: 10) {
                        nodes {
                            big: url(transform: {maxWidth: 1200})
                            medium: url(transform: {maxWidth: 600})
                            small: url(transform: {maxWidth: 300})
                            tiny: url(transform: {maxWidth: 124})
                            url,
                            src
                            width
                            height
                            altText
                        }
                    }
                    metafields(first: ${limit}) {
                        nodes {
                            namespace
                            key
                            value
                        }
                    }
                    variants(first: ${limit}) {
                        nodes {
                            title
                            price
                            quantityAvailable
                            sku
                            image {
                                big: url(transform: {maxWidth: 1200})
                                medium: url(transform: {maxWidth: 600})
                                small: url(transform: {maxWidth: 300})
                                tiny: url(transform: {maxWidth: 300})
                                width
                                height
                                altText
                            }
                            selectedOptions {
                                name
                                value
                            }
                            metafields(first: ${limit}){
                                nodes {
                                    namespace
                                    key
                                    value
                                }
                            }
                        }
                    }
                }
            }
        }`;

        const GRAPHQL_BODY = () => {
            return {
                async: true,
                crossDomain: true,
                method: "POST",
                headers: {
                    "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
                    "Content-Type": "application/graphql",
                    Accept: "application/json",
                },
                body: productQuery,
            };
        };

        return fetch(GRAPHQL_URL, GRAPHQL_BODY())
            .then((res) => {
                if (res.ok) return res.json();
                else {
                    setError("Could not load products");
                    throw new Error("Failed to fetch products");
                }
            })
            .then(({ data }) => {
                return {
                    data: data.products.nodes,
                    error: "",
                };
            });
    };

    const parseVariants = (products) => {
        let _products = [];

        products.forEach((product) => {
            const { title, id, metafields, variants, images, handle, availableForSale } = product;

            const subtitle = metafields.nodes.find((field) => field.key === "subtitle")?.value;
            const displayTitle = metafields.nodes.find((field) => field.key === "displayTitle")?.value;
            const material = metafields.nodes.find((field) => field.key === "material")?.value;
            const preOrder = metafields.nodes.find((field) => field.key === "preOrder")?.value;

            const sizes = variants.nodes.reduce((acc, curr) => {
                let _qty = curr.quantityAvailable;
                let _size = curr.selectedOptions.find((option) => option.name === "Size")?.value || "";

                if (acc.find((options) => options.size === _size)) {
                    const _sizeIndex = acc.findIndex((options) => options.size === _size);
                    if (_qty > acc[_sizeIndex].qty) acc[_sizeIndex].qty = _qty;
                } else acc.push({ size: _size, qty: _qty });

                return acc;
            }, []);

            const colors = variants.nodes.reduce((acc, curr) => {
                let _color = curr.selectedOptions.find((option) => option.name === "Color")?.value || "";
                let _hex = curr.metafields.nodes.find((option) => option.key === "color_codes")?.value || "";

                if (!acc.find((options) => options.name === _color)) acc.push({ name: _color, hex: _hex });

                return acc;
            }, []);

            if (variants.nodes.length > 0) {
                variants.nodes.forEach((variant) => {
                    const { title: variantTitle, price, image, selectedOptions, metafields, quantityAvailable } = variant;

                    const color_hex = metafields.nodes.find((metafield) => metafield.key === "color_codes")?.value || "";
                    const color = selectedOptions.find((option) => option.name === "Color")?.value || "";

                    let meta = [];

                    selectedOptions.forEach(({ name, value }) => {
                        let temp = {};

                        temp.price = price ?? "";
                        if (name === "Size") {
                            temp.size = value;
                            temp.qty = quantityAvailable;
                        }
                        if (name === "Color") {
                            temp.color = value;
                            temp.hex = color_hex;
                        }

                        meta = { ...meta, ...temp };
                    });

                    if (!_products.find((p) => p.title === title && p.color === color)) {
                        _products.push({
                            id: id ?? null,
                            title: title ?? "",
                            variantTitle,
                            handle,
                            subtitle: subtitle ?? "",
                            displayTitle: displayTitle ?? "",
                            material: material ?? "",
                            preOrder: preOrder === "true" ? true : false,
                            soldOut: quantityAvailable === 0 ? true : false,
                            color,
                            price,
                            url: handle ?? "",
                            totalQty: quantityAvailable,
                            images: {
                                all: images.nodes ?? [],
                                variant: image !== null && image !== undefined ? image : images.nodes[0] !== undefined ? images.nodes[0] : [],
                            },
                            meta: [meta] ?? [],
                            globals: {
                                sizes,
                                colors,
                                soldOut: !availableForSale,
                            },
                        });
                    } else {
                        const index = _products.findIndex((p) => p.title === title && p.color === color);
                        _products[index].meta.push(meta);
                        _products[index].totalQty = _products[index].totalQty + quantityAvailable;
                        _products[index].soldOut = _products[index].totalQty === 0 ? true : false;
                    }
                });
            }
        });
        return _products;
    };

    useEffect(() => {
        fetchProducts(20).then(({ data, error }) => {
            if (error !== "") setError(error);
            else setProducts(parseVariants(data));
        });
    }, []);

    return (
        <Container className="page-shop" initial="enter" animate="animate" exit="exit" variants={pageTransition}>
            <ProductGrid>{products.length > 0 ? <ProductGallery products={products.slice(0, products.length / 2)} /> : <h4>{error === null ? "Loading" : error}</h4>}</ProductGrid>

            <ImageBlock color="offWhite">
                <ImageBlockItem image={image4} />
                <ImageBlockItem title="" body="Crafted with care of the finest materials available. Designed to endure for many years to come. With responsible choices at our core, HEDVIG offers multi-purposed garments to be with you wherever you may go." button="Read our story" url="/about" bg="green" style="left" />
            </ImageBlock>

            <ProductGrid>{products.length > 0 ? <ProductGallery products={products.slice(products.length / 2, products.length)} /> : <h4>{error === null ? "Loading" : error}</h4>}</ProductGrid>

            <ImageBlock color="offWhite">
                <ImageBlockItem title="" body="Helsinki-based womenswear brand that values the beauty of enjoyment with a responsible approach to all we do." button="Read our story" url="/about" bg="blue" style="left" />
                <ImageBlockItem image={image5} />
            </ImageBlock>
        </Container>
    );
};

export default Shop;

const Container = styled(motion.section)`
    position: relative;
    min-height: 100vh;
    height: auto;
    width: 100%;
`;

const ProductGrid = styled.section`
    h4 {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3rem 0;
    }
`;
