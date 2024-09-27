import { createContext, useContext, useState } from "react";

// Define types for the context
type UIContextType = {
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  selectedEventId: string | null;
  setSelectedEventId: React.Dispatch<React.SetStateAction<string | null>>;
  isAddEventModalOpen: boolean;
  setIsAddEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditEventModalOpen: boolean;
  setIsEditEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMoreEventsModalOpen: boolean;
  setIsMoreEventsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amountEventsToRender: number;
  SetAmountEventsToRender: React.Dispatch<React.SetStateAction<number>>;
  amountEventsToRenderForHeader: number;
  SetAmountEventsToRenderForHeader: React.Dispatch<
    React.SetStateAction<number>
  >;
  amountEventsToRenderIfButtonVisible: number;
  SetAmountEventsToRenderIfButtonVisible: React.Dispatch<
    React.SetStateAction<number>
  >;
  amountEventsToRenderIfButtonVisibleForHeader: number;
  SetAmountEventsToRenderIfButtonVisibleForHeader: React.Dispatch<
    React.SetStateAction<number>
  >;
};

// Context setup
const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [isMoreEventsModalOpen, setIsMoreEventsModalOpen] = useState(false);
  const [amountEventsToRender, SetAmountEventsToRender] = useState<number>(0);
  const [amountEventsToRenderForHeader, SetAmountEventsToRenderForHeader] =
    useState<number>(0);
  const [
    amountEventsToRenderIfButtonVisible,
    SetAmountEventsToRenderIfButtonVisible,
  ] = useState<number>(0);
  const [
    amountEventsToRenderIfButtonVisibleForHeader,
    SetAmountEventsToRenderIfButtonVisibleForHeader,
  ] = useState<number>(0);

  return (
    <UIContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedEventId,
        setSelectedEventId,
        isAddEventModalOpen,
        setIsAddEventModalOpen,
        isEditEventModalOpen,
        setIsEditEventModalOpen,
        isMoreEventsModalOpen,
        setIsMoreEventsModalOpen,
        amountEventsToRender,
        SetAmountEventsToRender,
        amountEventsToRenderForHeader,
        SetAmountEventsToRenderForHeader,
        amountEventsToRenderIfButtonVisible,
        SetAmountEventsToRenderIfButtonVisible,
        amountEventsToRenderIfButtonVisibleForHeader,
        SetAmountEventsToRenderIfButtonVisibleForHeader,
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
