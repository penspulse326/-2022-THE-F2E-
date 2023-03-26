import { createContext, useContext } from "react";

export const SignContext = createContext(null);
export const UseSignContext = () => useContext(SignContext);
