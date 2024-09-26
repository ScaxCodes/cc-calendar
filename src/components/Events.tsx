import { EventForm } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext"; // Import the context
import { sortEvents } from "../utils/sortEvents";

export default function Events({
  eventsForDay,
  isHeaderCell,
}: {
  eventsForDay: EventForm[];
  isHeaderCell: boolean;
}) {
  const {
    setSelectedDate,
    setSelectedEventId,
    setIsEditEventModalOpen,
    amountEventsToRender,
    amountEventsToRenderForHeader,
    amountEventsToRenderIfButtonVisible,
    amountEventsToRenderIfButtonVisibleForHeader,
  } = useUI(); // Get the necessary functions from context

  const eventsForDaySorted = sortEvents(eventsForDay);

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

  let renderLimit = isHeaderCell
    ? amountEventsToRenderForHeader
    : amountEventsToRender;

  const eventsAreHidden = eventsForDay.length - renderLimit > 0;

  if (eventsAreHidden) {
    renderLimit = isHeaderCell
      ? amountEventsToRenderIfButtonVisibleForHeader
      : amountEventsToRenderIfButtonVisible;
  }

  return (
    <>
      {eventsForDaySorted.map((singleEvent, index) => {
        if (index + 1 > renderLimit) return;
        return (
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
        );
      })}
    </>
  );
}
