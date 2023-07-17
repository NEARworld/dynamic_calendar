import { FC } from "react";

import { Day } from "./day.jsx";
import { ClickedDate, Days, ROW_HEIGHT } from "../App";

export type RowProps = {
  days: Days;
  nth: number;
  clickedDate: ClickedDate;
  setClickedDate: (value: ClickedDate) => void;
};

export const Row: FC<RowProps> = ({
  days,
  nth,
  clickedDate,
  setClickedDate,
}) => {
  const isCurrentRowActive = clickedDate?.nth === nth;

  const controlTransform = () => {
    if (isCurrentRowActive) return `translateY(-${(nth - 1) * ROW_HEIGHT}px)`;
    else if (clickedDate?.nth) return `translateY(-${nth * ROW_HEIGHT}px)`;
    return undefined;
  };
  const controlBackgroundColor = () => {
    if (isCurrentRowActive) return "#edf2f7";

    if (typeof days[0] === "string") return "lightsteelblue";
    return "white";
  };

  return (
    <div
      style={{
        transition: isCurrentRowActive
          ? "0.5s, all ease-in-out 0.5s"
          : "0.5s, all ease-in-out 0.5s",
        display: "grid",
        justifyItems: "stretch",
        transform: controlTransform(),
        gridTemplateColumns: "repeat(7, 1fr)",
        width: `${days.length * ROW_HEIGHT}px`,
        backgroundColor: controlBackgroundColor(),
        zIndex: isCurrentRowActive ? 10 : days.length - nth,
      }}
    >
      {days.map((day, idx) => (
        <div key={idx} style={{ aspectRatio: 1 }}>
          <Day
            nth={nth}
            day={day}
            clickedDate={clickedDate}
            setClickedDate={setClickedDate}
          />
        </div>
      ))}
    </div>
  );
};
