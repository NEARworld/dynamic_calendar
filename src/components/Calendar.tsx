import { FC, useEffect, useMemo, useState } from "react";

import { Row } from "./Row";
import { ClickedDate, monthConfig } from "../date.config";

type CurrentDate = {
  year: number;
  month: number;
};
type TopBarPropsType = {
  currentDate: CurrentDate;
  setCurrentDate: (value: CurrentDate) => void;
};

export const ROW_HEIGHT = 60;

export const Calendar = () => {
  const [clickedDate, setClickedDate] = useState<ClickedDate>();

  const [currentDate, setCurrentDate] = useState<CurrentDate>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const { days, rows } = useMemo(() => monthConfig(), []);

  return (
    <>
      <TopBar currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <div
        style={{
          display: "grid",
          marginTop: "10px",
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
    </>
  );
};

const TopBar: FC<TopBarPropsType> = ({ currentDate, setCurrentDate }) => {
  useEffect(() => {
    console.log(currentDate);
  }, [currentDate]);

  const buttonStyle = {
    borderRadius: "100%",
    border: "none",
    width: "35px",
    aspectRatio: 1,
    cursor: "pointer",
  };

  const changeMonth = (target: "prev" | "next") => {
    const { month } = currentDate;
    const calculatedMonth = target === "prev" ? month - 1 : month + 1;

    if (calculatedMonth < 1)
      setCurrentDate({
        year: currentDate.year - 1,
        month: 12,
      });
    else if (calculatedMonth > 12)
      setCurrentDate({
        year: currentDate.year + 1,
        month: 1,
      });
    else setCurrentDate({ ...currentDate, month: calculatedMonth });
  };

  return (
    <header
      style={{
        color: "white",
        display: "flex",
        marginTop: "10px",
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <button style={buttonStyle} onClick={() => changeMonth("prev")}>
        {"<"}
      </button>
      <div
        style={{
          display: "grid",
          placeItems: "center",
        }}
      >
        <span>
          {currentDate.year} / {currentDate.month}
        </span>
      </div>
      <button style={buttonStyle} onClick={() => changeMonth("next")}>
        {">"}
      </button>
    </header>
  );
};
