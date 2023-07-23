import { FC } from "react";

import { Date } from "./Date";
import { ROW_HEIGHT } from "./Calendar";
import { ClickedDate, Dates } from "../date.config";

export type RowProps = {
  dates: Dates;
  nth: number;
  clickedDate: ClickedDate;
  setClickedDate: (value: ClickedDate) => void;
};

export const Row: FC<RowProps> = ({
  dates,
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

    if (typeof dates[0] === "string") return "lightsteelblue";
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
        width: `${dates.length * ROW_HEIGHT}px`,
        backgroundColor: controlBackgroundColor(),
        zIndex: isCurrentRowActive ? 10 : dates.length - nth,
      }}
    >
      {dates.map((date, idx) => (
        <div key={idx} style={{ aspectRatio: 1 }}>
          <Date
            nth={nth}
            day={date}
            clickedDate={clickedDate}
            setClickedDate={setClickedDate}
          />
        </div>
      ))}
    </div>
  );
};
