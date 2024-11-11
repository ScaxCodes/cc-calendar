import { EventForm } from "../contexts/EventContext";

export default function MoreEventsButton({
  eventsForDay,
  isHeaderCell,
  onClick,
  renderLimits,
  moreButtonRef,
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
  moreButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
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
      <button ref={moreButtonRef} className="text-[9px] sm:text-xs font-bold" onClick={onClick}>
        +{numberOfHiddenEvents} More
      </button>
    );
  }

  return null;
}
