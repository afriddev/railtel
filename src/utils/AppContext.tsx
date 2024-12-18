"use client"
import { contextType, dispatchDataType } from "@/types/AppContextDatatypes";
import { createContext, ReactNode, useContext, useReducer } from "react";

const initState: contextType = {
  dispatch: () => {},
  step: 1,
};

const contextProvider = createContext(initState);

function reducer(state: contextType, action: dispatchDataType) {
  switch (action?.type) {
    case "setSelectedMethod":
      return {
        ...state,
        selectedMethod: action?.payload?.method,
        selectedStudent: action?.payload?.data,
      };

    default:
      throw new Error("Action unkonwn");
  }
}
export default function AppContext({ children }: { children: ReactNode }) {
  const [{ step }, dispatch] = useReducer(reducer, initState);

  return (
    <contextProvider.Provider
      value={{
        dispatch,
        step,
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
