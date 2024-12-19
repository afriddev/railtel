"use client";
import { contextType, dispatchDataType } from "@/types/AppContextDatatypes";
import { createContext, ReactNode, useContext, useReducer } from "react";

const initState: contextType = {
  dispatch: () => {},
  step: 1,
  selectedMenu: {
    index: 0,
    title: "Dashboard",
    desc: "Railtel Dashboard change modify users and more...",
  },
};

const contextProvider = createContext(initState);

function reducer(state: contextType, action: dispatchDataType) {
  switch (action?.type) {
    case "setSelectedMenu":
      return {
        ...state,
        selectedMenu: action?.payload,
      };

    default:
      throw new Error("Action unkonwn");
  }
}
export default function AppContext({ children }: { children: ReactNode }) {
  const [{ step, selectedMenu }, dispatch] = useReducer(reducer, initState);

  return (
    <contextProvider.Provider
      value={{
        dispatch,
        step,
        selectedMenu,
      }}
    >
      {children}
    </contextProvider.Provider>
  );
}

export function useAppContext() {
  const context = useContext(contextProvider);
  if (!context) throw new Error("Unable to use!");
  return context;
}
