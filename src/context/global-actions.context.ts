import { createContext } from "react";

interface GlobalActionsValue {
    activeDialog: "newExpense" | null,
    openNewExpense: () => void,
    closeDialog: () => void,
}

export const GlobalActionsContext = createContext<GlobalActionsValue | undefined>(undefined);