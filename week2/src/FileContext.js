import { createContext, useContext } from "react";

export const FileContext = createContext(null);
export const UseFileContext = () => useContext(FileContext);
