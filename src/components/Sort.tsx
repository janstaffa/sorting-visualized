import React, { useEffect, useRef } from 'react';
import { Highlight } from '../types';

export type DrawStateFn = (
  canvas: HTMLCanvasElement,
  array: number[],
  highlights?: Highlight[]
) => void;

interface SortProps {
  order: number[];
  highlights: Highlight[];
}

const defaultColor = '#ff0000';
export const Sort: React.FC<SortProps> = ({ order, highlights }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvas.current) return;
    const width = canvas.current.width;
    const height = canvas.current.height;
    const itemWidth = width / order.length;
    const ctx = canvas.current.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    order.forEach((item, i) => {
      const highlighted = highlights?.find(
        (highlight) => highlight.index === i
      );
      if (highlighted) {
        ctx.fillStyle = highlighted.color;
      } else {
        ctx.fillStyle = defaultColor;
      }
      const realHeight = item * (height / order.length);
      ctx.fillRect(
        i * itemWidth + 1,
        height - realHeight,
        itemWidth - 1,
        realHeight
      );

      ctx.fillStyle = '#000000';
      ctx.font = `${itemWidth > 20 ? '12' : itemWidth / 2}px Arial`;
      ctx.fillText(item.toString(), i * itemWidth + 5, height - 3);
    });
  });
  return (
    <div>
      <canvas
        className="sort-canvas"
        ref={canvas}
        width="600"
        height="365"
      ></canvas>
    </div>
  );
};
