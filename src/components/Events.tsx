import { EventForm } from "../contexts/EventContext";

export default function Events({
  eventsForDay,
}: {
  eventsForDay: EventForm[];
}) {
  const eventsForDaySorted = eventsForDay.sort((a, b) => {
    if (a.allDay && !b.allDay) return -1;
    if (!a.allDay && b.allDay) return 1;
    return !a.allDay && !b.allDay ? a.startTime.localeCompare(b.startTime) : 0;
  });

  return (
    <>
      {eventsForDaySorted.map((singleEvent) => (
        <div key={singleEvent.id} className="flex items-center">
          {singleEvent.allDay ? (
            <div className={`bg-custom-${singleEvent.color}`}>
              {singleEvent.name}
            </div>
          ) : (
            <>
              <div
                className={`bg-custom-${singleEvent.color} mr-3 h-3 w-3 rounded-full`}
              />
              <div className="mr-1">{singleEvent.startTime}</div>
              <div>{singleEvent.name}</div>
            </>
          )}
        </div>
      ))}
    </>
  );
}
