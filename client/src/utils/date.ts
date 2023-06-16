export const getCorrectDateStr = (msecDelay = 0, date = new Date()): string => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const correctDate = new Date(date.getTime() - tzoffset + msecDelay);
  return correctDate.toISOString().substring(0, 16);
};

export const getValidDateStr = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date
    .toLocaleString("en-GB", {
      hour12: false,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", " ")
    .replaceAll("/", ".");
};
