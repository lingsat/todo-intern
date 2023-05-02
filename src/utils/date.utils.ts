export const getCurrentDateStr = () => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const curentTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .substring(0, 16);
  return curentTime;
};

export const getNextDateStr = () => {
  const today = new Date();
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const tomorrow = new Date(Date.now() - tzoffset);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().substring(0, 16);
};

export const getTenMinAgo = () => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const curentTimeAgo = new Date(Date.now() - tzoffset - 10 * 60 * 1000);
  return curentTimeAgo.toISOString().substring(0, 16);
};

export const getTenMinAfter = (date: string) => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const now = new Date(date);
  const curentTimeAfter = new Date(now.getTime() - tzoffset + 10 * 60 * 1000);
  return curentTimeAfter.toISOString().substring(0, 16);
};

export const getTenYearsAfter = () => {
  const tenYearsInMs = 315569259747;
  const curentTimeAgo = new Date(Date.now() + tenYearsInMs);
  return curentTimeAgo.toISOString().substring(0, 16);
};

export const getValidDateStr = (dateStr: string) => {
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
