import { EventForm } from "../contexts/EventContext";

export default function Events({
  eventsForDay,
  setSelectedDate,
  setSelectedEventId,
  setIsEditEventModalOpen,
}: {
  eventsForDay: EventForm[];
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedEventId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsEditEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
      setSelectedDate(date);
      setSelectedEventId(id);
      setIsEditEventModalOpen(true);
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
                <div className="overflow-hidden">{singleEvent.name}</div>
              </div>
            ) : (
              <>
                <div
                  className={`bg-custom-${singleEvent.color} mr-2 h-3 w-3 shrink-0 rounded-full`}
                />
                <div className="text-timed-event mr-2">
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
