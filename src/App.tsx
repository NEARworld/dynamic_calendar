import { useMemo, useState } from "react";
import { Row } from "./components/row";

import "./App.css";

export type Days = (string | number)[];

const date = new Date();
const days: Days = "일월화수목금토".split("");

/**
 * getDay
 * @function
 * @return {number} - 0 represents Sunday
 */
const firstDayOfThisMonth: number = new Date(
  date.getFullYear(),
  date.getMonth(),
  1,
).getDay();
const firstDayOfNextMonth: number = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  1,
).getDay();
/**
 * getDate
 * @function
 * @return {number} - today's date between 1 and 31
 */
const lastDate: number = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  0,
).getDate();
const datesOfThisMonth: number[] = Array.from(
  { length: lastDate },
  (_, i) => i + 1,
);
const lastDateOfLastMonth: number = new Date(
  date.getFullYear(),
  date.getMonth(),
  0,
).getDate();

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
  return rows;
};

export const ROW_HEIGHT = 60;

function App() {
  const [clickedNthRow, setClickedNthRow] = useState<null | number>(null);

  const rows: Days[] = useMemo(
    () => generateRowsForCalendar(totalDatesShownInThisMonth),
    [],
  );

  console.log(clickedNthRow);
  return (
    <div
      style={{
        display: "grid",
        height: clickedNthRow ? `${2 * ROW_HEIGHT}px` : `${7 * ROW_HEIGHT}px`,
        transition: "0.5s, height ease-in-out 0.5s",
      }}
    >
      <Row
        nth={0}
        days={days}
        clickedNthRow={clickedNthRow}
        setClickedNthRow={setClickedNthRow}
      />
      {rows.map((days, idx) => (
        <Row
          key={idx}
          days={days}
          nth={idx + 1}
          clickedNthRow={clickedNthRow}
          setClickedNthRow={setClickedNthRow}
        />
      ))}
    </div>
  );
}

export default App;
