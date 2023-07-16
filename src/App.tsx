import { useMemo, useState } from "react";
import { Row } from "./components/row";

import "./App.css";

export type Days = (string | number)[];

const date = new Date();
const days: Days = "일월화수목금토".split("");

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
const lastDate: number = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  0,
).getDate();
const daysOfThisMonth: number[] = Array.from(
  { length: lastDate },
  (_, i) => i + 1,
);

const lastDayOfLastMonth: number = new Date(
  date.getFullYear(),
  date.getMonth(),
  0,
).getDate();

const daysOfLastMonthShownInThisMonth: number[] = Array.from(
  { length: firstDayOfThisMonth },
  (_, i) => lastDayOfLastMonth - i,
).reverse();
const daysOfNextMonthShownInThisMonth: number[] = Array.from(
  { length: 7 - firstDayOfNextMonth },
  (_, i) => i + 1,
);

const totalDaysShownInThisMonth: number[] = daysOfLastMonthShownInThisMonth
  .concat(daysOfThisMonth)
  .concat(daysOfNextMonthShownInThisMonth);

const generateRowsForCalendar = (totalDays: number[]): Days[] => {
  const rows: number[][] = [];
  for (let i = 0; i < 6; ++i) rows.push(totalDays.slice(7 * i, 7 * (i + 1)));
  return rows;
};

function App() {
  const [clickedNthRow, setClickedNthRow] = useState<null | number>(null);

  const rows = useMemo(
    () => generateRowsForCalendar(totalDaysShownInThisMonth),
    [],
  );

  return (
    <div style={{ display: "grid" }}>
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
