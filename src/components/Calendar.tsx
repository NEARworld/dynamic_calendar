import { useMemo, useState } from "react";

import { Row } from "./Row";
import { ClickedDate, monthConfig } from "../date.config";

export const ROW_HEIGHT = 60;

export const Calendar = () => {
  const [clickedDate, setClickedDate] = useState<ClickedDate>();

  const { days, rows } = useMemo(() => monthConfig(), []);

  return (
    <div
      style={{
        display: "grid",
        marginTop: "100px",
        backgroundColor: "white",
        width: `${7 * ROW_HEIGHT}px`,
        transition: "0.5s, height ease-in-out 0.5s",
        height: clickedDate?.nth
          ? `${2 * ROW_HEIGHT}px`
          : `${7 * ROW_HEIGHT}px`,
      }}
    >
      <Row
        nth={0}
        dates={days}
        clickedDate={clickedDate}
        setClickedDate={setClickedDate}
      />
      {rows.map((dates, idx) => (
        <Row
          key={idx}
          dates={dates}
          nth={idx + 1}
          clickedDate={clickedDate}
          setClickedDate={setClickedDate}
        />
      ))}
    </div>
  );
};
