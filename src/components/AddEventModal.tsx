import { useRef, useState } from "react";

type EventForm = {
  name: string;
  allDay: boolean;
  startTime: string;
  endTime: string;
  color: string;
};

export function AddEventModal({
  selectedDate,
  onClose,
  onSubmit,
}: {
  selectedDate: string;
  onClose: () => void;
  onSubmit: (event: EventForm) => void;
}) {
  // State for "All Day" checkbox
  const [allDay, setAllDay] = useState(false);
  // State for selected color
  const [selectedColor, setSelectedColor] = useState<string>("red");

  // Refs for form fields
  const nameRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventForm: EventForm = {
      name: nameRef.current?.value || "",
      allDay,
      startTime: allDay ? "" : startTimeRef.current?.value || "",
      endTime: allDay ? "" : endTimeRef.current?.value || "",
      color: selectedColor, // Get selected color from state
    };
    onSubmit(eventForm);
    onClose(); // Close modal after submission
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
            ></img>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Event Name */}
          <div className="mb-4">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              ref={nameRef}
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
                ref={startTimeRef}
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
                ref={endTimeRef}
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
