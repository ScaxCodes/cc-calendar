import { EventForm } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext";

export default function MoreEventsButton({
  eventsForDay,
  isHeaderCell,
  onClick,
}: {
  eventsForDay: EventForm[];
  isHeaderCell: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const {
    amountEventsToRender,
    amountEventsToRenderForHeader,
    amountEventsToRenderIfButtonVisible,
    amountEventsToRenderIfButtonVisibleForHeader,
  } = useUI();

  let renderLimit = isHeaderCell
    ? amountEventsToRenderForHeader
    : amountEventsToRender;

  const eventsAreHidden = eventsForDay.length - renderLimit > 0;

  if (eventsAreHidden) {
    renderLimit = isHeaderCell
      ? amountEventsToRenderIfButtonVisibleForHeader
      : amountEventsToRenderIfButtonVisible;

    const numberOfHiddenEvents = eventsForDay.length - renderLimit;

    return (
      <button className="text-xs font-bold" onClick={onClick}>
        +{numberOfHiddenEvents} More
      </button>
    );
  }
}
