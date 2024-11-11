import { createContext, useContext, useState } from "react";

// Define types for the context
type UIContextType = {
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  selectedEventId: string | null;
  setSelectedEventId: React.Dispatch<React.SetStateAction<string | null>>;
  isMoreEventsModalOpen: boolean;
  setIsMoreEventsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Context setup
const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isMoreEventsModalOpen, setIsMoreEventsModalOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedEventId,
        setSelectedEventId,
        isMoreEventsModalOpen,
        setIsMoreEventsModalOpen,
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
