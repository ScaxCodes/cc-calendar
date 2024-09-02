import { format, subMonths, addMonths } from "date-fns";

export default function Navigation({
  currentMonth,
  setCurrentMonth,
}: {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <nav className="my-4 ml-4 flex items-center gap-4">
      <button
        onClick={() => setCurrentMonth(new Date())}
        className="border-custom-grey hover:bg-today-button-bg-hover ml-4 rounded-md border px-4 py-1"
      >
        Today
      </button>
      <button onClick={handlePreviousMonth}>&lt;</button>
      <button onClick={handleNextMonth}>&gt;</button>
      <span className="font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
    </nav>
  );
}
