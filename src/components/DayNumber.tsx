import { format } from "date-fns";

export function DayNumber({
  todayHighlightClass,
  day,
  dayNumberRef,
}: {
  todayHighlightClass: string;
  day: Date;
  dayNumberRef: React.MutableRefObject<HTMLDivElement | null>;
  }) {
  return (
    <div ref={dayNumberRef} className={`mb-1 ${todayHighlightClass} text-sm`}>
      {format(day, "d")}
    </div>
  );
}
