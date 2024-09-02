import { useRef, useState } from "react";
import { useEvents, EventForm } from "../contexts/EventContext";

export function AddEventModal({
  selectedDate,
  onClose,
}: {
  selectedDate: string;
  onClose: () => void;
}) {
  const { addEvent } = useEvents();

  // Using useRef for fields that don't need to trigger re-renders
  const nameRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  // State for fields that require reactivity
  const [allDay, setAllDay] = useState(false);
  const [selectedColor, setSelectedColor] = useState("red");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent: EventForm = {
      id: Date.now().toString(),
      name: nameRef.current?.value || "", // Getting value from ref
      allDay,
      startTime: allDay ? "" : startTimeRef.current?.value || "",
      endTime: allDay ? "" : endTimeRef.current?.value || "",
      color: selectedColor,
    };

    // Add event via context method
    addEvent(selectedDate, newEvent);
    onClose(); // Close modal after adding the event
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add Event</h2>
          <span>{selectedDate}</span>
          <button onClick={onClose}>
            <img
              src="https://www.svgrepo.com/show/513658/cross.svg"
              className="w-4"
              alt="Close"
            />
          </button>
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

          {/* All Day Checkbox */}
          <div className="mb-4">
            <input
              type="checkbox"
              checked={allDay}
              onChange={() => setAllDay((prev) => !prev)} // Still using state for allDay
            />
            <label className="ml-2 text-sm font-medium">All Day?</label>
          </div>

          {/* Start Time and End Time */}
          <div className="mb-4 flex justify-between gap-2">
            <div className="w-full">
              <label className="block text-sm font-medium">Start Time</label>
              <input
                type="time"
                ref={startTimeRef} // Using ref instead of state
                className="mt-1 w-full rounded border p-2"
                disabled={allDay} // Disable if allDay is true
                required={!allDay}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium">End Time</label>
              <input
                type="time"
                ref={endTimeRef} // Using ref instead of state
                className="mt-1 w-full rounded border p-2"
                disabled={allDay} // Disable if allDay is true
                required={!allDay}
              />
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <label className="text-sm font-medium">Color</label>
            <div className="mt-2 flex items-center gap-4">
              {["red", "green", "blue"].map((color) => (
                <label className="cursor-pointer" key={color}>
                  <input
                    type="radio"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    className="hidden"
                  />
                  <span
                    className={`bg-custom-${color} block h-8 w-8 rounded-sm ${
                      selectedColor === color ? "opacity-100" : "opacity-50"
                    }`}
                  ></span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-add-button-bg text-add-button-text hover:bg-add-button-bg-hover border-add-button-border w-full rounded border py-2"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
