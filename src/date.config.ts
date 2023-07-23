export type Dates = (string | number)[];
export type ClickedDate =
  | {
      nth: number;
      date: string | number | null;
    }
  | undefined;

export const monthConfig = (currentDate: { year: number; month: number }) => {
  const { year, month } = currentDate;
  const days: Dates = "일월화수목금토".split("");

  const firstDayOfThisMonth: number = new Date(year, month, 1).getDay();
  const firstDayOfNextMonth: number = new Date(year, month + 1, 1).getDay();

  /**
   * getDate
   * @function
   * @return {number} - today's date between 1 and 31
   */
  const lastDate: number = new Date(year, month + 1, 0).getDate();
  const datesOfThisMonth: number[] = Array.from(
    { length: lastDate },
    (_, i) => i + 1,
  );
  const lastDateOfLastMonth: number = new Date(year, month, 0).getDate();

  /**
   * datesOfLastMonthShownInThisMonth
   * @firstDayOfThisMonth - 0 to 6 (Sunday is 0)
   * @lastDateOfLastMonth - a number between 28 and 31
   *
   * @description
   * if
   *  firstDayOfThisMonth = 2 (Tuesday)
   *  lastDateOfLastMonth = 28
   * @return {number[]} - [28, 27, 26].reverse();
   */
  const datesOfLastMonthShownInThisMonth: number[] = Array.from(
    { length: firstDayOfThisMonth },
    (_, i) => lastDateOfLastMonth - i,
  ).reverse();
  /**
   * datesOfNextMonthShownInThisMonth
   * @firstDayOfNextMonth - 0 to 6 (Sunday is 0)
   *
   * @description
   * if
   *  firstDayOfNextMonth = 2 (Tuesday)
   *  length becomes 5 (which means 5 days of a week, Tuesday to Saturday)
   * @return {number[]} - [1, 2, 3, 4, 5]
   */
  const datesOfNextMonthShownInThisMonth: number[] = Array.from(
    { length: 7 - firstDayOfNextMonth },
    (_, i) => i + 1,
  );

  const totalDatesShownInThisMonth: number[] = datesOfLastMonthShownInThisMonth
    .concat(datesOfThisMonth)
    .concat(datesOfNextMonthShownInThisMonth);

  const generateRowsForCalendar = (totalDates: number[]): number[][] => {
    const rows: number[][] = [];
    for (let i = 0; i < 6; ++i) rows.push(totalDates.slice(7 * i, 7 * (i + 1)));
    if (rows[5] && rows[5][0] === 1) rows.pop();
    return rows;
  };

  return { days, rows: generateRowsForCalendar(totalDatesShownInThisMonth) };
};
