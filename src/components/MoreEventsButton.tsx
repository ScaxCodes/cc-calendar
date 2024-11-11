import { EventForm } from "../contexts/EventContext";

export default function MoreEventsButton({
  eventsForDay,
  isHeaderCell,
  onClick,
  renderLimits,
}: {
  eventsForDay: EventForm[];
  isHeaderCell: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  renderLimits: {
    normal: number;
    header: number;
    withButton: number;
    headerWithButton: number;
  };
}) {
  let renderLimit = isHeaderCell ? renderLimits.header : renderLimits.normal;
  const eventsAreHidden = eventsForDay.length - renderLimit > 0;

  // Only render button if there are events to hide
  if (eventsAreHidden) {
    renderLimit = isHeaderCell
      ? renderLimits.headerWithButton
      : renderLimits.withButton;

    const numberOfHiddenEvents = eventsForDay.length - renderLimit;

    return (
      <button className="text-xs font-bold" onClick={onClick}>
        +{numberOfHiddenEvents} More
      </button>
    );
  }

  return null;
}
