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
};

// Create the context with undefined as the default value
const UIContext = createContext<UIContextType | undefined>(undefined);

// Create a provider component
export const UIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [isMoreEventsModalOpen, setIsMoreEventsModalOpen] = useState(false);

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
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

// Custom hook to use UI context
export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
