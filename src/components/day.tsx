import { FC, useState } from "react";
import { FillGreyColorToDate, RowProps } from "./row";

type DayProps = {
  day: RowProps["days"][number];
  fillGreyColorToDate: FillGreyColorToDate;
} & Pick<RowProps, "nth" | "setClickedNthRow">;

export const Day: FC<DayProps> = ({
  nth,
  day,
  setClickedNthRow,
  fillGreyColorToDate,
}) => {
  const [hovered, setHovered] = useState(false);

  const controlHoverEffect = () => {
    if (typeof day === "number")
      return {
        color: hovered ? "white" : "black",
        backgroundColor: hovered ? "Wheat" : "transparent",
        cursor: hovered ? "pointer" : "none",
      };
    return null;
  };

  return (
    <button
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...controlHoverEffect(),
        ...fillGreyColorToDate(day, hovered),
      }}
      onClick={() => {
        !nth && setClickedNthRow(null);
        nth && setClickedNthRow(nth);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {day}
    </button>
  );
};
