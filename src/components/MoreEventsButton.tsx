import { EventForm } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext";

export default function MoreEventsButton({
  eventsForDay,
  isHeaderCell,
}: {
  eventsForDay: EventForm[];
  isHeaderCell: boolean;
}) {
  const {
    setSelectedDate,
    setIsMoreEventsModalOpen,
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

    const handleShowModal = (event: React.MouseEvent<HTMLButtonElement>) => {
      const date = event.currentTarget.parentElement?.getAttribute("data-date");
      if (date) {
        setSelectedDate(date); // Use context instead of props
        setIsMoreEventsModalOpen(true); // Use context instead of props
      }
    };

    return (
      // For debugging
      // <button className="w-fit bg-indigo-500 text-xs font-bold">
      <button className="text-xs font-bold" onClick={handleShowModal}>
        +{numberOfHiddenEvents} More
      </button>
    );
  }
}
