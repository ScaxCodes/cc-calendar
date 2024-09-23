import { EventForm } from "../contexts/EventContext";
import { useUI } from "../contexts/UIContext";

export default function MoreEventsButton({
  eventsForDay,
  renderEventsNumber,
  renderEventsNumberHeader,
  renderEventsNumberButtonVisible,
  renderEventsNumberHeaderButtonVisible,
  isHeaderCell,
}: {
  eventsForDay: EventForm[];
  renderEventsNumber: number;
  renderEventsNumberHeader: number;
  renderEventsNumberButtonVisible: number;
  renderEventsNumberHeaderButtonVisible: number;
  isHeaderCell: boolean;
}) {
  let renderLimit = isHeaderCell
    ? renderEventsNumberHeader
    : renderEventsNumber;

  const eventsAreHidden = eventsForDay.length - renderLimit > 0;

  if (eventsAreHidden) {
    renderLimit = isHeaderCell
      ? renderEventsNumberHeaderButtonVisible
      : renderEventsNumberButtonVisible;

    const numberOfHiddenEvents = eventsForDay.length - renderLimit;

    const { setSelectedDate, setIsMoreEventsModalOpen } = useUI();

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
