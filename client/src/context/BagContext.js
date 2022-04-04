import { createContext, useReducer } from "react";

export const BagContext = createContext(null);

const bagReducer = (state, action) => {
    switch (action.type) {
        case "OPENBAG":
            return { ...state, bagIsOpen: action.payload };
        default:
            return { ...state };
    }
};

export function BagProvider({ children }) {
    const [state, dispatch] = useReducer(bagReducer, { bagIsOpen: false });

    const showBag = () => {
        dispatch({ type: "OPENBAG", payload: !state.bagIsOpen });
    };

    return <BagContext.Provider value={{ ...state, showBag }}>{children}</BagContext.Provider>;
}
