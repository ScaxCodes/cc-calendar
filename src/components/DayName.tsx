import { format } from "date-fns";

export function DayName({ index, day, dayNameRef }: { index: number; day: Date; dayNameRef: React.MutableRefObject<HTMLDivElement | null> }) {
  return (
    <div 
      ref={index === 0 ? dayNameRef : null} 
      className="text-week-name text-xs"
    >
      {index <= 6 && format(day, "EEE").toUpperCase()}
    </div>
  );
}
