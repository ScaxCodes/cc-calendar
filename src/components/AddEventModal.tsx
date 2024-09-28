import { useEffect, useRef, useState } from "react";
import { useEvents, EventForm } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext";
import { convertDateForModal } from "../utils/convertDateForModal";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { awaitAnimationBeforeClosing } from "../utils/awaitAnimationBeforeClosing";

export function AddEventModal({ onClose }: { onClose: () => void }) {
  const { addEvent } = useEvents();
  const { selectedDate } = useUI();

  // Using useRef for fields that don't need to trigger re-renders
  const nameRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  // State for fields that require reactivity
  const [allDay, setAllDay] = useState(false);
  const [selectedColor, setSelectedColor] = useState("red");
  // Additional state to track start time for form validation
  const [startTime, setStartTime] = useState<string | null>(null);

  // New state to control animation
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  // Trigger animation after mounting the component
  useEffect(() => {
    setIsAnimatingIn(true);
  }, []);

  // Enable ESC key to close the modal (accessability)
  useEscapeKey(() => awaitAnimationBeforeClosing(setIsAnimatingIn, onClose));

  // Handle form submission
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newEvent: EventForm = {
      id: Date.now().toString(),
      name: nameRef.current?.value || "",
      allDay,
      startTime: allDay ? "" : startTimeRef.current?.value || "",
      endTime: allDay ? "" : endTimeRef.current?.value || "",
      color: selectedColor,
    };

    addEvent(selectedDate, newEvent);
    awaitAnimationBeforeClosing(setIsAnimatingIn, onClose);
  }

  // For form validation only
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStartTime(e.target.value);

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
          <h2 className="text-3xl">Add Event</h2>
          <span className="text-modal-date-header text-2xl">
            {convertDateForModal(selectedDate)}
          </span>
          <button
            onClick={() =>
              awaitAnimationBeforeClosing(setIsAnimatingIn, onClose)
            }
            className="text-3xl"
          >
            &#215;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Event Name */}
          <div className="mb-4">
            <label className="text-modal-form-label text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              ref={nameRef}
              className="w-full rounded border p-2"
              required
              autoFocus
            />
          </div>

          {/* All Day Checkbox */}
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

          {/* Start Time and End Time */}
          <div className="mb-4 flex justify-between gap-2">
            <div className="w-full">
              <label className="text-modal-form-label block text-sm font-medium">
                Start Time
              </label>
              <input
                type="time"
                ref={startTimeRef}
                className="w-full rounded border p-2"
                disabled={allDay} // Disabled if allDay is true
                required={!allDay}
                onChange={handleStartTimeChange}
              />
            </div>
            <div className="w-full">
              <label className="text-modal-form-label block text-sm font-medium">
                End Time
              </label>
              <input
                type="time"
                ref={endTimeRef}
                className="w-full rounded border p-2"
                disabled={allDay} // Disabled if allDay is true
                required={!allDay}
                min={startTime || ""}
              />
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <label className="text-modal-form-label text-sm font-medium">
              Color
            </label>
            <div className="flex items-center gap-4">
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
