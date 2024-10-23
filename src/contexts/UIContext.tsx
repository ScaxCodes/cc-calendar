import { createContext, useContext, useState } from "react";

// Define types for the context
type UIContextType = {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedEventId: string;
  setSelectedEventId: React.Dispatch<React.SetStateAction<string>>;
  isMoreEventsModalOpen: boolean;
  setIsMoreEventsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amountEventsToRender: number;
  setAmountEventsToRender: React.Dispatch<React.SetStateAction<number>>;
  amountEventsToRenderForHeader: number;
  setAmountEventsToRenderForHeader: React.Dispatch<
    React.SetStateAction<number>
  >;
  amountEventsToRenderIfButtonVisible: number;
  setAmountEventsToRenderIfButtonVisible: React.Dispatch<
    React.SetStateAction<number>
  >;
  amountEventsToRenderIfButtonVisibleForHeader: number;
  setAmountEventsToRenderIfButtonVisibleForHeader: React.Dispatch<
    React.SetStateAction<number>
  >;
};

// Context setup
const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [isMoreEventsModalOpen, setIsMoreEventsModalOpen] = useState(false);
  const [amountEventsToRender, setAmountEventsToRender] = useState<number>(0);
  const [amountEventsToRenderForHeader, setAmountEventsToRenderForHeader] =
    useState<number>(0);
  const [
    amountEventsToRenderIfButtonVisible,
    setAmountEventsToRenderIfButtonVisible,
  ] = useState<number>(0);
  const [
    amountEventsToRenderIfButtonVisibleForHeader,
    setAmountEventsToRenderIfButtonVisibleForHeader,
  ] = useState<number>(0);

  return (
    <UIContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedEventId,
        setSelectedEventId,
        isMoreEventsModalOpen,
        setIsMoreEventsModalOpen,
        amountEventsToRender,
        setAmountEventsToRender,
        amountEventsToRenderForHeader,
        setAmountEventsToRenderForHeader,
        amountEventsToRenderIfButtonVisible,
        setAmountEventsToRenderIfButtonVisible,
        amountEventsToRenderIfButtonVisibleForHeader,
        setAmountEventsToRenderIfButtonVisibleForHeader,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

// Custom hook to use UI context
export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
