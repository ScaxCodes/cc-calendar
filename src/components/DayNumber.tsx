import { format } from "date-fns";

export function DayNumber({
  todayHighlightClass,
  day,
}: {
  todayHighlightClass: string;
  day: Date;
}) {
  return (
    <div className={`mb-1 ${todayHighlightClass} text-sm`}>
      {format(day, "d")}
    </div>
  );
}
