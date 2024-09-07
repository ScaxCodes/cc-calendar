import { EventForm } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext"; // Import the context

export default function Events({
  eventsForDay,
}: {
  eventsForDay: EventForm[];
}) {
  const { setSelectedDate, setSelectedEventId, setIsEditEventModalOpen } =
    useUI(); // Get the necessary functions from context

  const eventsForDaySorted = eventsForDay.sort((a, b) => {
    if (a.allDay && !b.allDay) return -1;
    if (!a.allDay && b.allDay) return 1;
    return !a.allDay && !b.allDay ? a.startTime.localeCompare(b.startTime) : 0;
  });

  const handleEditEvent = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    const date = event.currentTarget.parentElement?.getAttribute("data-date");
    if (date) {
      setSelectedDate(date); // Use context to set selected date
      setSelectedEventId(id); // Use context to set selected event ID
      setIsEditEventModalOpen(true); // Use context to open edit modal
    }
  };

  return (
    <>
      {eventsForDaySorted.map((singleEvent) => (
        <button
          key={singleEvent.id}
          onClick={(event) => handleEditEvent(event, singleEvent.id)}
          className="mb-2 w-full overflow-hidden whitespace-nowrap text-left"
        >
          <div className="flex items-center">
            {singleEvent.allDay ? (
              <div
                className={`w-full rounded px-1 text-white bg-custom-${singleEvent.color}`}
              >
                {singleEvent.name}
              </div>
            ) : (
              <>
                <div
                  className={`bg-custom-${singleEvent.color} mr-3 h-3 w-3 shrink-0 rounded-full`}
                />
                <div className="text-timed-event mr-1">
                  {singleEvent.startTime}
                </div>
                <div>{singleEvent.name}</div>
              </>
            )}
          </div>
        </button>
      ))}
    </>
  );
}
