import { EventForm } from "../contexts/EventContext";
import { sortEvents } from "../utils/sortEvents";

export default function Events({
  eventsForDay,
  isHeaderCell,
  onClick,
  renderLimits,
  eventRef,
}: {
  eventsForDay: EventForm[];
  isHeaderCell: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  renderLimits: {
    normal: number;
    header: number;
    withButton: number;
    headerWithButton: number;
  };
  eventRef: React.MutableRefObject<HTMLButtonElement | null>;
}) {
  const eventsForDaySorted = sortEvents(eventsForDay);

  let renderLimit = isHeaderCell ? renderLimits.header : renderLimits.normal;
  const eventsAreHidden = eventsForDay.length - renderLimit > 0;

  if (eventsAreHidden) {
    renderLimit = isHeaderCell 
      ? renderLimits.headerWithButton 
      : renderLimits.withButton;
  }

  const eventsToRender = eventsForDaySorted.slice(0, renderLimit);

  return (
    <>
      {eventsToRender.map((singleEvent, index) => {
        return (
          <button
            key={singleEvent.id}
            onClick={(event) => onClick(event, singleEvent.id)}
            ref={index === 0 ? eventRef : undefined}
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
                  <div className="mr-1 text-timed-event">
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
