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

  const mutableArray = [...currentArray];

  const remainingItemsRef = useRef<number>(remainingItems);
  remainingItemsRef.current = remainingItems;

  useEffect(() => {
    setRemainingItems(items);
  }, [items]);
  useEffect(() => {
    if (!canvas.current) return;
    drawState(canvas.current, mutableArray);

    if (pause) return;
    let hasEnded = false;

    const timer = setInterval(async () => {
      if (!canvas.current) return;
      let changed = false;
      await new Promise((resolve, reject) => {
        let i = 0;
        const innerTimer = setInterval(() => {
          if (i > mutableArray.length) {
            clearInterval(innerTimer);
            resolve(true);
            return;
          }
          if (!canvas.current) return;
          const thisItem = mutableArray[i];
          const nextItem = mutableArray[i + 1];

          if (thisItem > nextItem) {
            const temp = mutableArray[i];
            mutableArray[i] = mutableArray[i + 1];
            mutableArray[i + 1] = temp;
            changed = true;
          }
          addComparison();
          if (i + 1 < remainingItemsRef.current) {
            drawState(canvas.current, mutableArray, [
              { index: i, color: '#00ff00' },
              { index: i + 1, color: '#00ff00' },
            ]);
          }
          i++;
        }, onePassDuration / remainingItemsRef.current);
      });
      if (!changed && !hasEnded) {
        hasEnded = true;
        clearInterval(timer);
        let count = 1;
        const finishTimer = setInterval(() => {
          if (count > mutableArray.length + 1) {
            clearInterval(finishTimer);
            setIsSorted(true);
            return;
          }
          if (!canvas.current) return;
          drawState(canvas.current, mutableArray, [
            { index: mutableArray.indexOf(count), color: '#00ff00' },
          ]);
          count++;
        }, 20);
      }
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
