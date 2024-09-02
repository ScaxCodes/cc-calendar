import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Event form and state types
export type EventForm = {
  id: string;
  name: string;
  allDay: boolean;
  startTime: string;
  endTime: string;
  color: string;
};

type EventsByDate = {
  [date: string]: EventForm[];
};

// Context setup
const EventContext = createContext<
  | {
      events: EventsByDate;
      addEvent: (date: string, eventForm: EventForm) => void;
      editEvent: (date: string, updatedEvent: EventForm) => void;
      deleteEvent: (date: string, eventId: string) => void;
    }
  | undefined
>(undefined);

const LOCAL_STORAGE_KEY = "calendarEvents";

export const EventProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Directly initialize state with localStorage data or empty object if nothing found
  const [events, setEvents] = useState<EventsByDate>(() => {
    const storedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedEvents ? JSON.parse(storedEvents) : {};
  });

  // Save events to localStorage whenever the `events` state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const addEvent = (date: string, eventForm: EventForm) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [date]: prevEvents[date] ? [...prevEvents[date], eventForm] : [eventForm],
    }));
  };

  const editEvent = (date: string, updatedEvent: EventForm) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [date]: prevEvents[date]
        ? prevEvents[date].map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event,
          )
        : [], // If no events exist for that date, return an empty array
    }));
  };

  const deleteEvent = (date: string, eventId: string) => {
    setEvents((prevEvents) => {
      const filteredEvents = prevEvents[date].filter(
        (event) => event.id !== eventId,
      );

      // Create a copy of the previous events
      const newEvents = { ...prevEvents };

      if (filteredEvents.length > 0) {
        // If there are remaining events for the date, update it
        newEvents[date] = filteredEvents;
      } else {
        // If no events remain, remove the date key
        delete newEvents[date];
      }

      return newEvents;
    });
  };

  return (
    <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to use events context
export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};
