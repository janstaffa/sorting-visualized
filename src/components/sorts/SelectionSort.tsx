import { useEffect, useRef, useState } from 'react';
import { DrawStateFn } from '../SortWrap';

export interface BubbleSortProps {
  pause: boolean;
  speed: number;
  items: number;
  currentArray: number[];
  drawState: DrawStateFn;
  isSorted: boolean;
  setIsSorted: React.Dispatch<React.SetStateAction<boolean>>;
  addComparison: () => void;
}

const BubbleSort: React.FC<BubbleSortProps> = ({
  pause,
  speed,
  items,
  currentArray,
  drawState,
  isSorted,
  setIsSorted,
  addComparison,
}) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const onePassDuration = 1000 / speed;
  const [remainingItems, setRemainingItems] = useState<number>(0);
  const [sortedSubArray, setSortedSubArray] = useState<number[]>([]);
  const sortedSubArrayRef = useRef<number[]>([]);
  sortedSubArrayRef.current = sortedSubArray;

  const [subArray, setSubArray] = useState<number[]>([]);
  const subArrayRef = useRef<number[]>([]);
  subArrayRef.current = subArray;

  const remainingItemsRef = useRef<number>(remainingItems);
  remainingItemsRef.current = remainingItems;

  useEffect(() => {
    setRemainingItems(items);
  }, [items]);
  useEffect(() => {
    if (!canvas.current) return;
    drawState(canvas.current, currentArray);

    if (pause) return;
    let hasEnded = false;

    setSubArray(currentArray);
    setSortedSubArray([]);

    let i = 1;
    const timer = setInterval(async () => {
      if (!canvas.current) return;

      let minValue: number | undefined = undefined;
      for (const val of subArrayRef.current) {
        if (minValue === undefined || val < minValue) {
          minValue = val;
        }
      }
      if (!minValue) return;
      subArrayRef.current.splice(subArrayRef.current.indexOf(minValue), 1);
      setSubArray(subArrayRef.current);
      const newSortedArray = [...sortedSubArrayRef.current, minValue];
      setSortedSubArray(newSortedArray);
      const newFullArray = [...newSortedArray, ...subArrayRef.current];
      drawState(canvas.current, newFullArray, [
        {
          index: newFullArray.indexOf(minValue),
          color: '#00ff00',
        },
      ]);
      if (i === newFullArray.length && !hasEnded) {
        hasEnded = true;
        clearInterval(timer);
        let count = 1;
        console.log('here');
        const finishTimer = setInterval(() => {
          if (count > newFullArray.length + 1) {
            clearInterval(finishTimer);
            setIsSorted(true);
            return;
          }
          if (!canvas.current) return;
          drawState(canvas.current, newFullArray, [
            { index: newFullArray.indexOf(count), color: '#00ff00' },
          ]);
          count++;
        }, 20);
      }
      i++;
      setRemainingItems(remainingItemsRef.current - 1);
    }, onePassDuration);

    return () => clearInterval(timer);
  }, [pause, speed]);

  useEffect(() => {
    if (!canvas.current) return;
    drawState(canvas.current, currentArray);
  }, [currentArray]);

  return (
    <canvas
      className="sort-canvas"
      ref={canvas}
      width="768"
      height="365"
    ></canvas>
  );
};

export default BubbleSort;
