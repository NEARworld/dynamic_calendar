import { Day } from "./day.jsx";
import { FC } from "react";

const ROW_HEIGHT = 60;

export type RowProps = {
  arr: (string | number)[];
  nth: number;
  clickedNthRow: number | null;
  setClickedNthRow: (nth: number | null) => void;
};

export const Row: FC<RowProps> = ({
  arr,
  nth,
  clickedNthRow,
  setClickedNthRow,
}) => {
  const fillGreyColorToDate = (day: number, hovered: boolean) => {
    const lightGrey = { color: "lightgrey" };
    if (hovered) return undefined;
    if (nth === 0 && day >= 22) return lightGrey;
    if (nth === 5 && day <= 7) return lightGrey;
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
        width: `${arr.length * ROW_HEIGHT}px`,
        gridTemplateColumns: "repeat(7, 1fr)",
        zIndex: clickedNthRow === nth ? 10 : arr.length - nth,
        backgroundColor: clickedNthRow === nth ? "FloralWhite" : "GhostWhite",
      }}
    >
      {arr.map((day, idx) => (
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
