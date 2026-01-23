export function convertMillisecondToStopWatch(counter: number) {
  const SECOND_IN_MILLISECOND = 1000;
  const MINUTE_IN_MILLISECOND = 60 * SECOND_IN_MILLISECOND;
  const HOUR_IN_MILLISECOND = 60 * MINUTE_IN_MILLISECOND;

  const hours = Math.floor(counter / HOUR_IN_MILLISECOND);

  const minutes = Math.floor(
    (counter - hours * HOUR_IN_MILLISECOND) / MINUTE_IN_MILLISECOND,
  );
  const secondes = Math.floor(
    (counter - hours * HOUR_IN_MILLISECOND - minutes * MINUTE_IN_MILLISECOND) /
      SECOND_IN_MILLISECOND,
  );
  const deciSecond = Math.floor(
    (counter -
      hours * HOUR_IN_MILLISECOND -
      minutes * MINUTE_IN_MILLISECOND -
      secondes * SECOND_IN_MILLISECOND) /
      10,
  );

  return {
    hours,
    minutes,
    secondes,
    deciSecond,
  };
}
export function formatNumber(number: number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number.toString();
}
