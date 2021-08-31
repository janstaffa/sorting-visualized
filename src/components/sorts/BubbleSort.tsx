import { useEffect, useRef } from 'react';
import { DrawStateFn } from '../SortWrap';

export interface BubbleSortProps {
  pause: boolean;
  speed: number;
  items: number;
  currentArray: number[];
  drawState: DrawStateFn;
}

const BubbleSort: React.FC<BubbleSortProps> = ({
  pause,
  speed,
  items,
  currentArray,
  drawState,
}) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const onePassDuration = 1000 / speed;
  const mutableArray = [...currentArray];
  useEffect(() => {
    if (!canvas.current) return;
    drawState(canvas.current, mutableArray);

    if (pause) return;
    let remainingItems = currentArray.length;
    let hasEnded = false;
    const timer = setInterval(async () => {
      console.log('called', remainingItems);
      if (!canvas.current) return;
      let changed = false;

      await new Promise((resolve, reject) => {
        let i = 0;
        const innerTimer = setInterval(() => {
          if (i > currentArray.length) {
            clearInterval(innerTimer);
            resolve(true);
            return;
          }
          if (!canvas.current) return;
          //  for (let i = 0; i < currentArray.length; i++) {
          const thisItem = mutableArray[i];
          const nextItem = mutableArray[i + 1];

          if (thisItem > nextItem) {
            const temp = mutableArray[i];
            mutableArray[i] = mutableArray[i + 1];
            mutableArray[i + 1] = temp;
            changed = true;
          }
          if (i + 1 < remainingItems) {
            drawState(canvas.current, mutableArray, [
              { index: i, color: '#00ff00' },
              { index: i + 1, color: '#00ff00' },
            ]);
          }
          //   else {

          //  }

          i++;
          //  }
        }, onePassDuration / remainingItems);
      });
      if (!changed && !hasEnded) {
        hasEnded = true;
        clearInterval(timer);
        let count = 1;
        const finishTimer = setInterval(() => {
          if (count > mutableArray.length + 1) {
            clearInterval(finishTimer);
            return;
          }
          if (!canvas.current) return;
          drawState(canvas.current, mutableArray, [
            { index: mutableArray.indexOf(count), color: '#00ff00' },
          ]);
          count++;
        }, 30);
      }
      remainingItems--;
    }, onePassDuration);

    return () => clearInterval(timer);
  });

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
