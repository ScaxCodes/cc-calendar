import { useEffect, useRef, useState } from "react";
import { useEvents, EventForm } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext";
import { convertDateForModal } from "../utils/convertDateForModal";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { awaitAnimationBeforeClosing } from "../utils/awaitAnimationBeforeClosing";
import FocusTrap from "focus-trap-react";

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

  // New state and ref to control animation
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  // Trigger animation after mounting the component
  useEffect(() => {
    setIsAnimatingIn(true);
  }, []);

  // Enable ESC key to close the modal (accessability)
  useEscapeKey(() =>
    awaitAnimationBeforeClosing(modalRef, setIsAnimatingIn, onClose),
  );

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

    if (selectedDate !== null) addEvent(selectedDate, newEvent);
    awaitAnimationBeforeClosing(modalRef, setIsAnimatingIn, onClose);
  }

  // For form validation only
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStartTime(e.target.value);

  return (
    <FocusTrap focusTrapOptions={{ initialFocus: () => nameRef.current }}>
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${isAnimatingIn ? "opacity-50" : "opacity-0"}`}
        ></div>
        <div
          className={`w-96 transform rounded bg-white p-6 shadow-lg transition-transform duration-300 ${
            isAnimatingIn ? "scale-100" : "scale-0"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-3xl">Add Event</h2>
            <span className="text-2xl text-modal-date-header">
              {convertDateForModal(selectedDate)}
            </span>
            <button
              onClick={() =>
                awaitAnimationBeforeClosing(modalRef, setIsAnimatingIn, onClose)
              }
              className="flex h-8 w-8 items-center justify-center rounded-full text-3xl hover:bg-today-button-bg-hover"
            >
              &#215;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Event Name */}
            <div className="mb-4">
              <label
                className="text-sm font-medium text-modal-form-label"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                ref={nameRef}
                className="w-full rounded border p-2"
                required
              />
            </div>

            {/* All Day Checkbox */}
            <div className="mb-4 flex">
              <input
                type="checkbox"
                id="all-day"
                checked={allDay}
                onChange={() => setAllDay((prev) => !prev)}
              />
              <label
                className="ml-2 text-sm font-medium text-modal-form-label"
                htmlFor="all-day"
              >
                All Day?
              </label>
            </div>

            {/* Start Time and End Time */}
            <div className="mb-4 flex justify-between gap-2">
              <div className="w-full">
                <label
                  className="block text-sm font-medium text-modal-form-label"
                  htmlFor="start-time"
                >
                  Start Time
                </label>
                <input
                  type="time"
                  id="start-time"
                  ref={startTimeRef}
                  className="w-full rounded border p-2"
                  disabled={allDay} // Disabled if allDay is true
                  required={!allDay}
                  onChange={handleStartTimeChange}
                />
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-medium text-modal-form-label"
                  htmlFor="end-time"
                >
                  End Time
                </label>
                <input
                  type="time"
                  id="end-time"
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
              <label className="text-sm font-medium text-modal-form-label">
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
                      tabIndex={0}
                      className={`bg-custom-${color} block h-8 w-8 rounded-sm ${
                        selectedColor === color ? "opacity-100" : "opacity-50"
                      }`}
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          setSelectedColor(color);
                        }
                      }}
                    ></span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded border border-add-button-border bg-add-button-bg py-2 text-add-button-text hover:bg-add-button-bg-hover"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </FocusTrap>
  );
}
