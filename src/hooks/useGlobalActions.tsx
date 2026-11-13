import { GlobalActionsContext } from "@/context/global-actions.context"
import { useContext } from "react"

export const useGlobalActions = () => {
  const context = useContext(GlobalActionsContext);

  if (context === undefined) {
    throw new Error("useGlobalActions debe usarse dentro de GlobalActionsProvider");
  }
  return context;
}