import { FC } from "react";

import { Days } from "../App";
import { Day } from "./day.jsx";

export type FillGreyColorToDate = (
  day: Days[number],
  hovered: boolean,
) => { color: string } | undefined;

export type RowProps = {
  days: Days;
  nth: number;
  clickedNthRow: number | null;
  setClickedNthRow: (nth: number | null) => void;
};

const ROW_HEIGHT = 60;

export const Row: FC<RowProps> = ({
  days,
  nth,
  clickedNthRow,
  setClickedNthRow,
}) => {
  const fillGreyColorToDate: FillGreyColorToDate = (day, hovered) => {
    const lightGrey = { color: "lightgrey" };
    if (hovered) return undefined;
    if (typeof day === "number") {
      if (nth === 0 && day >= 22) return lightGrey;
      if (nth === 5 && day <= 7) return lightGrey;
    }
    return undefined;
  };

  const controlTransform = () => {
    if (clickedNthRow === nth)
      return `translateY(-${(nth - 1) * ROW_HEIGHT}px)`;
    else if (clickedNthRow) return `translateY(-${nth * ROW_HEIGHT}px)`;
    else return undefined;
  };

  return (
    <div
      style={{
        transition:
          clickedNthRow === nth
            ? "0.5s, all ease-in-out 0.5s"
            : "0.5s, all ease-in 0.5s",
        display: "grid",
        justifyItems: "stretch",
        transform: controlTransform(),
        width: `${days.length * ROW_HEIGHT}px`,
        gridTemplateColumns: "repeat(7, 1fr)",
        zIndex: clickedNthRow === nth ? 10 : days.length - nth,
        backgroundColor: clickedNthRow === nth ? "FloralWhite" : "GhostWhite",
      }}
    >
      {days.map((day, idx) => (
        <div key={idx} style={{ aspectRatio: 1 }}>
          <Day
            nth={nth}
            day={day}
            setClickedNthRow={setClickedNthRow}
            fillGreyColorToDate={fillGreyColorToDate}
          />
        </div>
      ))}
    </div>
  );
};
