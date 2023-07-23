import { FC, useState } from "react";

import { RowProps } from "./Row";
import { ClickedDate } from "../date.config";

type DateProps = {
  day: RowProps["dates"][number];
  clickedDate: ClickedDate;
  setClickedDate: (value: ClickedDate) => void;
} & Pick<RowProps, "nth">;

export const Date: FC<DateProps> = ({
  nth,
  day,
  clickedDate,
  setClickedDate,
}) => {
  const [hovered, setHovered] = useState(false);
  const isCurrentDateClicked =
    nth === clickedDate?.nth && clickedDate.date === day;

  const controlTextColor = () => {
    const lightGrey = { color: "lightgrey" };

    if (typeof day === "number") {
      if (hovered || isCurrentDateClicked) return { color: "white" };
      // grey text color if the date is not the date of this month.
      if (nth === 1 && day >= 23) return lightGrey;
      if (nth === 5 && day <= 6) return lightGrey;
      if (nth === 6 && day <= 13) return lightGrey;
    }
    return null;
  };
  const controlSpanBackgroundColor = () => {
    const bgColor = "royalblue";
    if (typeof day === "number" && hovered) return bgColor;
    if (isCurrentDateClicked) return bgColor;
    return undefined;
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
        backgroundColor: "transparent",
        cursor: hovered ? "pointer" : "none",
        ...controlTextColor(),
      }}
      onClick={() => {
        !nth && setClickedDate(undefined);
        nth && setClickedDate({ nth, date: day });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          width: "100%",
          aspectRatio: 1,
          display: "flex",
          borderRadius: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: controlSpanBackgroundColor(),
          transition: "0.5s, backgroundColor ease-in-out 0.5s",
        }}
      >
        {day}
      </span>
    </button>
  );
};
