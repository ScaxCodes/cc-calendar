import { format, parseISO } from "date-fns";

export function convertDateForModal(dateString: string) {
  const date = parseISO(dateString);
  const formattedDate = format(date, "M/d/yy");
  return formattedDate;
}
