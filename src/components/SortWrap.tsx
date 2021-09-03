import React, { ReactNode, useEffect, useRef, useState } from 'react';
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
    drawState: DrawStateFn,
    isSorted: boolean,
    setIsSorted: React.Dispatch<React.SetStateAction<boolean>>,
    addComparison: () => void
  ) => ReactNode;
}

const SortWrap: React.FC<SortWrapProps> = ({ sortName, children }) => {
  const [pause, setPause] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(2);
  const [items, setItems] = useState<number>(20);
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [comparisons, setComparisons] = useState<number>(0);
  const comparisonsRef = useRef<number>(comparisons);
  comparisonsRef.current = comparisons;
  const itemsInput = useRef<HTMLInputElement>(null);
  const resetBtn = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSorted) {
      setPause(true);
    }
  }, [isSorted]);

  useEffect(() => {
    if (!itemsInput.current || !resetBtn.current) return;
    if (pause) {
      itemsInput.current.classList.remove('banned');
      resetBtn.current.classList.remove('banned');
      return;
    }
    itemsInput.current.classList.add('banned');
    resetBtn.current.classList.add('banned');
  }, [pause]);
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
    console.log('Array', array);
    setCurrentArray(array);
  };

  const reset = () => {
    setPause(true);
    setCurrentArray(getRandomList(items));
    setIsSorted(false);
    setComparisons(0);
  };
  useEffect(() => {
    reset();
  }, [items]);
  const playPause = () => {
    if (isSorted) {
      reset();
    }
    setPause(!pause);
  };

  useEffect(() => {
    reset();
  }, []);
  const addComparison = () => {
    setComparisons(comparisonsRef.current + 1);
  };
  return (
    <div className="sort-wrap">
      <h3 className="sort-title">{sortName}</h3>
      <hr />
      <div className="sort-container">
        {children(
          pause,
          speed,
          items,
          currentArray,
          drawState,
          isSorted,
          setIsSorted,
          addComparison
        )}
      </div>
      <div className="sort-menu">
        <div className="menu-button" ref={resetBtn} onClick={reset}>
          <GrPowerReset />
        </div>
        <div className="menu-button" onClick={playPause}>
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
            ref={itemsInput}
            onChange={(e) => setItems(parseInt(e.target.value))}
          />
        </div>
        <div className="right">total comparisons: {comparisons}</div>
      </div>
    </div>
  );
};

export default SortWrap;
