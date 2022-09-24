import { useState, useEffect } from "react";
import styles from "./PawnSvg.module.css";

const PawnSvg = ({ parentRef }) => {
  const [pointerPosition, setPointerPosition] = useState({ x: 252.5, y: 124 });
  const parentDiv = parentRef.current;

  const mouseMove = (evt) => {
    const landingBox = evt.currentTarget;
    const screenW = landingBox.offsetWidth;
    const screenH = landingBox.offsetHeight;
    const mouseX = evt.clientX;
    const mouseY = evt.clientY;
    const changeX = (mouseX - screenW / 2) / (screenW / 2);
    const changeY = (mouseY - screenH / 2) / (screenH / 2);

    let movementRadius = 10;

    if (!(Math.abs(changeX) > 0.75 && Math.abs(changeY) > 0.75)) {
      setPointerPosition({
        x: 252.5 + movementRadius * changeX,
        y: 124 + movementRadius * changeY,
      });
    }
  };

  useEffect(() => {
    if (parentDiv) {
      parentDiv.addEventListener("mousemove", mouseMove);
    } else {
      setPointerPosition({ x: 252.5, y: 124 });
    }
    return () => {
      if (parentDiv) {
        parentDiv.removeEventListener("mousemove", mouseMove);
      }
    };
  }, [parentDiv]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 505 }}
      x="0px"
      y="0px"
      viewBox="0 0 505 505"
    >
      <g className="pawn">
        <circle
          cx="252.5"
          cy="252.5"
          fill="transparent"
          stroke="#e31e25"
          strokeWidth="4"
          r="215"
          className={styles["red-circle"]}
          strokeDasharray="215"
        />
        <circle
          cx="252.5"
          cy="252.5"
          fill="transparent"
          stroke="#66FF66"
          strokeWidth="3"
          r="230"
          className={styles["green-circle"]}
          strokeDasharray="230"
          strokeDashoffset="120"
        />
        <circle
          cx="252.5"
          cy="252.5"
          fill="transparent"
          stroke="#FFFF66"
          strokeWidth="5"
          r="245"
          className={styles["yellow-circle"]}
          strokeDasharray="245"
          strokeDashoffset="245"
        />
        <g>
          <circle style={{ fill: "#FFFF66" }} cx="252.5" cy="126" r="44" />
          <path
            style={{ fill: "#FFFF66" }}
            d="M301.5,241.3l-14-71.2h-70l-14,71.2c-3.3,16.5-13.5,32.6-28.8,46.2c-22.4,20-39.4,49.4-44.8,84.7
		c-0.8,5.2-1.3,10.4-1.5,15.5c-0.3,6.5,4.7,11.5,11.3,11.5h225.5c6.7,0,11.7-5,11.3-11.5c-0.2-5.2-0.8-10.3-1.5-15.5
		c-5.3-35.3-22.3-64.7-44.8-84.7C315,273.9,304.7,257.8,301.5,241.3z"
          />
        </g>
        <g>
          <path
            style={{ fill: "#66FF66" }}
            d="M294.2,180.8h-83.3c-6.8,0-12.3-5.5-12.3-12.3l0,0c0-6.8,5.5-12.3,12.3-12.3h83.3
		c6.8,0,12.3,5.5,12.3,12.3l0,0C306.5,175.3,301,180.8,294.2,180.8z"
          />
          <path
            style={{ fill: "#66FF66" }}
            d="M369.3,371.6H135.7c-7.7,0-14-6.3-14-14l0,0c0-7.7,6.3-14,14-14h233.6c7.7,0,14,6.3,14,14l0,0
		C383.3,365.4,377,371.6,369.3,371.6z"
          />
        </g>
        <g>
          <circle
            fill="#e31e25"
            cx={`${pointerPosition.x - 21}`}
            cy={`${pointerPosition.y}`}
            r="8"
          />
          <circle
            stroke="black"
            strokeWidth="2"
            fill="none"
            cx="231.5"
            cy="124"
            r="18"
          />
        </g>
        <g>
          <circle
            fill="#e31e25"
            cx={`${pointerPosition.x + 21}`}
            cy={`${pointerPosition.y}`}
            r="8"
          />
          <circle
            stroke="black"
            fill="none"
            strokeWidth="2"
            cx="273.5"
            cy="124"
            r="18"
          />
        </g>
      </g>
    </svg>
  );
};

export default PawnSvg;
