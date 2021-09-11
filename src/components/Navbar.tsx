import React from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';
import '../styles/Navbar.css';
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
        <div className="sort-menu">
          <div className="menu-button" /*ref={resetBtn}*/ onClick={reset}>
            <GrPowerReset />
          </div>
          <div className="menu-button" onClick={playPause}>
            {isPaused ? <FaPlay /> : <FaPause />}
          </div>
          <select>
            <option onClick={() => setEnabledSort(0)}>Bubble sort</option>
            <option onClick={() => setEnabledSort(1)}>Selection sort</option>
            <option onClick={() => setEnabledSort(2)}>Insertion sort</option>
            <option onClick={() => setEnabledSort(3)}>Merge sort</option>
            <option onClick={() => setEnabledSort(4)}>Quick sort</option>
          </select>

          <div className="menu-slider">
            <label>Speed</label>
            <input
              type="range"
              min="1"
              max="25"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
            />
          </div>
          <div className="menu-slider">
            <label>Items</label>
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
