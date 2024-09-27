import { format, subMonths, addMonths } from "date-fns";

export function Navigation({
  currentMonth,
  setCurrentMonth,
}: {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handlePreviousMonthSelection = () =>
    setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonthSelection = () =>
    setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <nav className="my-4 flex items-center gap-4">
      <button
        onClick={() => setCurrentMonth(new Date())}
        className="border-custom-grey hover:bg-today-button-bg-hover ml-4 rounded-md border px-4 py-1"
      >
        Today
      </button>
      <button onClick={handlePreviousMonthSelection}>&lt;</button>
      <button onClick={handleNextMonthSelection}>&gt;</button>
      <span className="font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
    </nav>
  );
}
