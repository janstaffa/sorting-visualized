import React from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';
import { maxItems, maxSpeed, minItems, minSpeed } from '../globals';
import '../styles/Navbar.css';
interface NavbarProps {
  setEnabledSort: React.Dispatch<React.SetStateAction<number>>;
  items: number;
  setItems: React.Dispatch<React.SetStateAction<number>>;
  speed: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  isPaused: boolean;
  reset: () => void;
  playPause: () => void;
}
export const Navbar: React.FC<NavbarProps> = ({
  setEnabledSort,
  items,
  setItems,
  isPaused,
  speed,
  setSpeed,
  reset,
  playPause,
}) => {
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
          <select onChange={(e) => setEnabledSort(parseInt(e.target.value))}>
            <option value={0}>Bubble sort</option>
            <option value={1}>Selection sort</option>
            <option value={2}>Insertion sort</option>
            <option value={3}>Merge sort</option>
            <option value={4}>Quick sort</option>
          </select>

          <div className="menu-slider">
            <label>Speed</label>
            <input
              type="range"
              min={minSpeed}
              max={maxSpeed}
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
            />
          </div>
          <div className="menu-slider">
            <label>Items</label>
            <input
              type="range"
              min={minItems}
              max={maxItems}
              value={items}
              onChange={(e) => setItems(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
