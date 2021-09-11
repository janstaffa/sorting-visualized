import React from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

interface NavbarProps {
  enabledSort: number;
  setEnabledSort: React.Dispatch<React.SetStateAction<number>>;
  items: number;
  setItems: React.Dispatch<React.SetStateAction<number>>;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  isSorted: boolean;
  reset: () => void;
}
export const Navbar: React.FC<NavbarProps> = ({
  enabledSort,
  setEnabledSort,
  items,
  setItems,
  isPaused,
  setIsPaused,
  isSorted,
  speed,
  setSpeed,
  reset,
}) => {
  const playPause = () => {
    if (isSorted) {
      reset();
    }
    setIsPaused(!isPaused);
  };

  return (
    <div>
      <h1 className="title">Sorting Visualized</h1>
      <div className="nav">
        <details>
          <summary>Table of contents:</summary>
          <hr />
          <span className="anchor" onClick={() => setEnabledSort(0)}>
            Bubble sort
          </span>
          <span className="anchor" onClick={() => setEnabledSort(1)}>
            Selection sort
          </span>
          <span className="anchor" onClick={() => setEnabledSort(2)}>
            Insertion sort
          </span>
          <span className="anchor" onClick={() => setEnabledSort(3)}>
            Merge sort
          </span>
          <span className="anchor" onClick={() => setEnabledSort(4)}>
            Quick sort
          </span>
        </details>

        <div className="sort-menu">
          <div className="menu-button" /*ref={resetBtn}*/ onClick={reset}>
            <GrPowerReset />
          </div>
          <div className="menu-button" onClick={playPause}>
            {isPaused ? <FaPlay /> : <FaPause />}
          </div>
          <div className="menu-slider">
            <label>Speed: ({speed})</label>
            <input
              type="range"
              min="1"
              max="10"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
            />
          </div>
          <div className="menu-slider">
            <label>Items: ({items})</label>
            <input
              type="range"
              min="5"
              max="250"
              value={items}
              //ref={itemsInput}
              onChange={(e) => setItems(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
