import { useMemo, useState } from "react";
import { Row } from "./components/row";

import "./App.css";

const date = new Date();
const days = "일월화수목금토".split("");
const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
const firstDayOfNextMonth = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  1,
).getDay();
const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const daysOfThisMonth = Array.from({ length: lastDate }, (_, i) => i + 1);

const lastDayOfLastMonth = new Date(
  date.getFullYear(),
  date.getMonth(),
  0,
).getDate();

const daysOfLastMonthShownInThisMonth = Array.from(
  { length: firstDay },
  (_, i) => lastDayOfLastMonth - i,
).reverse();
const daysOfNextMonthShownInThisMonth = Array.from(
  { length: 7 - firstDayOfNextMonth },
  (_, i) => i + 1,
);

const totalDaysShownInThisMonth = daysOfLastMonthShownInThisMonth
  .concat(daysOfThisMonth)
  .concat(daysOfNextMonthShownInThisMonth);

const generateRowsForCalendar = (totalDays: number[]) => {
  const rows = [];
  for (let i = 0; i < 6; ++i) {
    rows.push(totalDays.slice(7 * i, 7 * (i + 1)));
  }
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
        arr={days}
        clickedNthRow={clickedNthRow}
        setClickedNthRow={setClickedNthRow}
      />
      {rows.map((row, idx) => (
        <Row
          key={idx}
          arr={row}
          nth={idx + 1}
          clickedNthRow={clickedNthRow}
          setClickedNthRow={setClickedNthRow}
        />
      ))}
    </div>
  );
}

export default App;
