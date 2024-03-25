"use client"

import { createContext, useReducer } from "react";

const initialState = {
    showSideBar : false,
    active : false
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const { type, payload } = action;
        
        switch(type) {
            case "Display/Hide SideBar" :
                return {
                    ...state,
                    showSideBar : payload.showSideBar
                };
            case "Activate" :
                return {
                    ...state,
                    active : payload.active
                };
            case "Deactivate" :
                return {
                        ...state,
                    active : payload.active
                };
            default :
                throw new Error()
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };