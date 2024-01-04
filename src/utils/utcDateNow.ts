export const getUtcDateNow = () => {
  const today = new Date();

  return new Date(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
    today.getUTCHours(),
    today.getUTCMinutes(),
    today.getUTCSeconds(),
    today.getUTCMilliseconds(),
  );
};
