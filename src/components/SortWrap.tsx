import React, { ReactNode, useEffect, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';
import { getRandomList } from '../utils/randomList';

interface Highlight {
  index: number;
  color: string;
}
export type DrawStateFn = (
  canvas: HTMLCanvasElement,
  array: number[],
  highlights?: Highlight[]
) => void;
export interface SortWrapProps {
  sortName: string;
  children: (
    pause: boolean,
    speed: number,
    items: number,
    currentArray: number[],
    drawState: DrawStateFn
  ) => ReactNode;
}

const SortWrap: React.FC<SortWrapProps> = ({ sortName, children }) => {
  const [pause, setPause] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(2);
  const [items, setItems] = useState<number>(20);
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const reset = () => {
    setPause(true);
    setCurrentArray(getRandomList(items));
  };

  useEffect(() => {
    setCurrentArray(getRandomList(items));
    setPause(true);
  }, [items]);

  const drawState: DrawStateFn = (canvas, array, highlights) => {
    if (!canvas) return;
    const width = canvas.width;
    const height = canvas.height;
    const itemWidth = width / items;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    array.forEach((item, i) => {
      const highlighted = highlights?.find(
        (highlight) => highlight.index === i
      );
      if (highlighted) {
        ctx.fillStyle = highlighted.color;
      } else {
        ctx.fillStyle = '#ff0000';
      }

      const realHeight = item * (height / items);
      ctx.fillRect(
        i * itemWidth + 1,
        height - realHeight,
        itemWidth - 1,
        realHeight
      );
    });
    //  setCurrentArray(array);
  };
  return (
    <div className="sort-wrap">
      <h3 className="sort-title">{sortName}</h3>
      <hr />
      <div className="sort-container">
        {children(pause, speed, items, currentArray, drawState)}
      </div>
      <div className="sort-menu">
        <div className="menu-button" onClick={reset}>
          <GrPowerReset />
        </div>
        <div className="menu-button" onClick={() => setPause(!pause)}>
          {pause ? <FaPlay /> : <FaPause />}
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
            onChange={(e) => setItems(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default SortWrap;
