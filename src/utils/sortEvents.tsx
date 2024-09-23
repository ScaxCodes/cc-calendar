import { EventForm } from "../contexts/EventContext";

export function sortEvents(eventsForDay: EventForm[]) {
  const eventsForDaySorted = eventsForDay.sort((a, b) => {
    if (a.allDay && !b.allDay) return -1;
    if (!a.allDay && b.allDay) return 1;
    return !a.allDay && !b.allDay ? a.startTime.localeCompare(b.startTime) : 0;
  });

  return eventsForDaySorted;
}
