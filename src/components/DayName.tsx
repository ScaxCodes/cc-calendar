import { format } from "date-fns";

export function DayName({ index, day }: { index: number; day: Date }) {
  return (
    <div className="text-week-name text-xs">
      {index <= 6 && format(day, "EEE").toUpperCase()}
    </div>
  );
}
