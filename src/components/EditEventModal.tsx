import { useEffect, useRef, useState } from "react";
import { useEvents, EventForm } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext";
import { convertDateForModal } from "../utils/convertDateForModal";

export function EditEventModal({ onClose }: { onClose: () => void }) {
  const { events, editEvent, deleteEvent } = useEvents();
  const { selectedDate, selectedEventId } = useUI();
  if (selectedDate === null)
    throw new Error("No valid date string available for modal functionality!");

  // Default values needed for fade-out-modal after deletion of an event
  const [selectedEvent] =
    events[selectedDate]?.filter((event) => event.id === selectedEventId) || [];

  // Using useRef for fields that don't need to trigger re-renders
  const nameRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  // State for fields that require reactivity
  // Default values needed for fade-out-modal after deletion of an event
  const [allDay, setAllDay] = useState(selectedEvent?.allDay ?? false);
  const [selectedColor, setSelectedColor] = useState(
    selectedEvent?.color ?? "red",
  );
  // Additional state to track start time for form validation
  const [startTime, setStartTime] = useState(selectedEvent?.startTime ?? "");

  // Default values needed for fade-out-modal after deletion of an event
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.value = selectedEvent?.name ?? "";
    }
    if (startTimeRef.current) {
      startTimeRef.current.value = selectedEvent?.startTime ?? "";
    }
    if (endTimeRef.current) {
      endTimeRef.current.value = selectedEvent?.endTime ?? "";
    }
  }, [selectedEvent]);

  // New state to control animation
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  // Trigger animation after mounting the component
  useEffect(() => {
    setIsAnimatingIn(true);
  }, []);

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
    onCloseWrapper(); // Close modal after submission
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  function handleDelete() {
    onCloseWrapper();
    // TODO: DELETE AFTER onClose();
    deleteEvent(selectedDate, selectedEventId);
  }

  // To ensure we have a smooth transition before closing the modal
  function onCloseWrapper() {
    setIsAnimatingIn(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${isAnimatingIn ? "opacity-50" : "opacity-0"}`}
      ></div>
      <div
        className={`w-96 transform rounded bg-white p-6 shadow-lg transition-transform duration-300 ${
          isAnimatingIn ? "scale-100" : "scale-0"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Event</h2>
          <span className="text-modal-date-header">
            {convertDateForModal(selectedDate)}
          </span>
          <button onClick={onCloseWrapper}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Event Name */}
          <div className="mb-4">
            <label className="text-modal-form-label text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              ref={nameRef} // Using ref instead of state
              className="w-full rounded border p-2"
              required
            />
          </div>

          {/* All Day? */}
          <div className="mb-4 flex">
            <input
              type="checkbox"
              checked={allDay}
              onChange={() => setAllDay((prev) => !prev)}
            />
            <label className="text-modal-form-label ml-2 text-sm font-medium">
              All Day?
            </label>
          </div>

          {/* Start Time */}
          <div className="mb-4 flex justify-between gap-2">
            <div className="w-full">
              <label className="text-modal-form-label block text-sm font-medium">
                Start Time
              </label>
              <input
                type="time"
                ref={startTimeRef} // Using ref instead of state
                className="w-full rounded border p-2"
                disabled={allDay}
                required={!allDay}
                onChange={handleStartTimeChange} // For form validation only
              />
            </div>
            {/* End Time */}
            <div className="w-full">
              <label className="text-modal-form-label block text-sm font-medium">
                End Time
              </label>
              <input
                type="time"
                ref={endTimeRef} // Using ref instead of state
                className="w-full rounded border p-2"
                disabled={allDay}
                required={!allDay}
                min={startTime || ""}
              />
            </div>
          </div>

          {/* Color */}
          <div className="mb-4">
            <label className="text-modal-form-label text-sm font-medium">
              Color
            </label>
            <div className="flex items-center gap-4">
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
              className="border-delete-button-border bg-delete-button-bg text-delete-button-text hover:bg-delete-button-bg-hover w-full rounded border py-2"
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
