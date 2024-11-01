import { format, subMonths, addMonths } from "date-fns";

export function Navigation({
  currentMonth,
  setCurrentMonth,
  headerRef,
}: {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const handlePreviousMonthSelection = () =>
    setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonthSelection = () =>
    setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <nav className="my-4 flex items-center gap-4" ref={headerRef}>
      <button
        onClick={() => setCurrentMonth(new Date())}
        className="ml-4 rounded-md border border-custom-grey px-4 py-1 hover:bg-today-button-bg-hover"
      >
        Today
      </button>
      <button onClick={handlePreviousMonthSelection}>&lt;</button>
      <button onClick={handleNextMonthSelection}>&gt;</button>
      <span className="font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
    </nav>
  );
}
