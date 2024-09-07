import { format, parseISO } from "date-fns";

export function convertDateForModal(dateString: string | null) {
  if (dateString === null)
    throw new Error("No valid date string available for date-conversion!");

  const date = parseISO(dateString);
  const formattedDate = format(date, "M/d/yy");
  return formattedDate;
}
