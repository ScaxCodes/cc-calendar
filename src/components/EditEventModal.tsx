import { useEffect, useRef, useState } from "react";
import { useEvents, EventForm } from "../contexts/EventContext";

export function EditEventModal({
  selectedDate,
  selectedEventId,
  onClose,
}: {
  selectedDate: string;
  selectedEventId: string;
  onClose: () => void;
}) {
  const { events, editEvent, deleteEvent } = useEvents();
  const [selectedEvent] = events[selectedDate].filter(
    (event) => event.id === selectedEventId,
  );

  // Using useRef for fields that don't need to trigger re-renders
  const nameRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  const [allDay, setAllDay] = useState(selectedEvent.allDay);
  const [selectedColor, setSelectedColor] = useState(selectedEvent.color);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.value = selectedEvent.name;
    }
    if (startTimeRef.current) {
      startTimeRef.current.value = selectedEvent.startTime;
    }
    if (endTimeRef.current) {
      endTimeRef.current.value = selectedEvent.endTime;
    }
  }, [selectedEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const editedEvent: EventForm = {
      id: selectedEvent.id,
      name: nameRef.current?.value || "", // Getting value from ref
      allDay,
      startTime: allDay ? "" : startTimeRef.current?.value || "",
      endTime: allDay ? "" : endTimeRef.current?.value || "",
      color: selectedColor,
    };

    // Edit event via context method
    editEvent(selectedDate, editedEvent);
    onClose(); // Close modal after submission
  };

  function handleDelete() {
    // TODO: Delete Event
    deleteEvent(selectedDate, selectedEventId);
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Event</h2>
          <span>{selectedDate}</span>
          <button onClick={onClose}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Event Name */}
          <div className="mb-4">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              ref={nameRef} // Using ref instead of state
              className="mt-1 w-full rounded border p-2"
              required
            />
          </div>

          {/* All Day? */}
          <div className="mb-4">
            <input
              type="checkbox"
              checked={allDay}
              onChange={() => setAllDay((prev) => !prev)}
            />
            <label className="ml-2 text-sm font-medium">All Day?</label>
          </div>

          {/* Start Time */}
          <div className="mb-4 flex justify-between gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium">Start Time</label>
              <input
                type="time"
                ref={startTimeRef} // Using ref instead of state
                className="mt-1 w-full rounded border p-2"
                disabled={allDay}
                required={!allDay}
              />
            </div>
            {/* End Time */}
            <div className="w-full">
              <label className="block text-sm font-medium">End Time</label>
              <input
                type="time"
                ref={endTimeRef} // Using ref instead of state
                className="mt-1 w-full rounded border p-2"
                disabled={allDay}
                required={!allDay}
              />
            </div>
          </div>

          {/* Color */}
          <div className="mb-4">
            <label className="text-sm font-medium">Color</label>
            <div className="mt-2 flex items-center gap-4">
              {/* Red Square */}
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="red"
                  checked={selectedColor === "red"}
                  onChange={() => setSelectedColor("red")}
                  className="hidden"
                />
                <span
                  className={`bg-custom-red block h-8 w-8 rounded-sm ${
                    selectedColor === "red" ? "opacity-100" : "opacity-50"
                  }`}
                ></span>
              </label>
              {/* Green Square */}
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="green"
                  checked={selectedColor === "green"}
                  onChange={() => setSelectedColor("green")}
                  className="hidden"
                />
                <span
                  className={`bg-custom-green block h-8 w-8 rounded-sm ${
                    selectedColor === "green" ? "opacity-100" : "opacity-50"
                  }`}
                ></span>
              </label>
              {/* Blue Square */}
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="blue"
                  checked={selectedColor === "blue"}
                  onChange={() => setSelectedColor("blue")}
                  className="hidden"
                />
                <span
                  className={`bg-custom-blue block h-8 w-8 rounded-sm ${
                    selectedColor === "blue" ? "opacity-100" : "opacity-50"
                  }`}
                ></span>
              </label>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="border-add-button-border bg-add-button-bg text-add-button-text hover:bg-add-button-bg-hover w-full rounded border py-2"
            >
              Edit
            </button>
            {/* Delete Button */}
            <button
              className="border-add-button-border bg-add-button-bg text-add-button-text hover:bg-add-button-bg-hover w-full rounded border py-2"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
