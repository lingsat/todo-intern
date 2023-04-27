export const getCurrentDateStr = () => {
  return new Date().toISOString().substring(0, 10);
};

export const getNextDateStr = () => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().substring(0, 10);
};
