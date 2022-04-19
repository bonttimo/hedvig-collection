import { createContext, useReducer, useLayoutEffect } from "react";

// https://shopify.github.io/js-buy-sdk/#removing-line-items
import Client from "shopify-buy/index.unoptimized.umd";
// import Client from "shopify-buy";
window.client = Client.buildClient({
    domain: "hedvig-collection.myshopify.com",
    storefrontAccessToken: "dded2477ad5ce206ae4e3175641fabc1",
});

export const BagContext = createContext(null);

const bagReducer = (state, action) => {
    switch (action.type) {
        case "OPENBAG":
            return { ...state, isCartOpen: action.payload };
        case "SETCHECKOUT":
            return { ...state, checkout: action.payload };
        default:
            return { ...state };
    }
};

export function BagProvider({ children }) {
    const [state, dispatch] = useReducer(bagReducer, { checkout: {}, isCartOpen: false });

    useLayoutEffect(() => {
        createCheckout();
    }, []);

    const createCheckout = async () => {
        const checkout = await window.client.checkout.create();
        dispatch({ type: "SETCHECKOUT", payload: checkout });
    };

    const addItemToCeckout = async (id = null, quantity = 1) => {
        const lineItemsToAdd = [{ variantId: id, quantity: parseInt(quantity, 10) }];
        const checkoutId = state.checkout.id;
        const checkout = await window.client.checkout.addLineItems(checkoutId, lineItemsToAdd);

        dispatch({ type: "OPENBAG", payload: true });
        dispatch({ type: "SETCHECKOUT", payload: checkout });
    };

    const removeItemFromCheckout = async (id = null) => {
        const checkoutId = state.checkout.id;
        const checkout = await window.client.checkout.removeLineItems(checkoutId, [id]);
        dispatch({ type: "SETCHECKOUT", payload: checkout });
    };

    const updateItemInCheckout = async (id = null, quantity = 1) => {
        const checkoutId = state.checkout.id;
        const checkout = await window.client.checkout.updateLineItems(checkoutId, [{ id: id, quantity: parseInt(quantity, 10) }]);
        dispatch({ type: "SETCHECKOUT", payload: checkout });
    };

    const showCart = (show = null) => {
        if (show !== null) {
            dispatch({ type: "OPENBAG", payload: show });
        } else {
            dispatch({ type: "OPENBAG", payload: !state.isCartOpen });
        }
    };

    return <BagContext.Provider value={{ ...state, showCart, createCheckout, addItemToCeckout, removeItemFromCheckout, updateItemInCheckout }}>{children}</BagContext.Provider>;
}
