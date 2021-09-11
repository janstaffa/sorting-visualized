import React, { useEffect, useRef } from "react";

export interface Highlight {
  index: number;
  color: string;
}
export type DrawStateFn = (
  canvas: HTMLCanvasElement,
  array: number[],
  highlights?: Highlight[]
) => void;

interface SortProps {
  order: number[];
  highlights: Highlight[];
}

const defaultColor = "#ff0000";
export const Sort: React.FC<SortProps> = ({ order, highlights }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvas.current) return;
    const width = canvas.current.width;
    const height = canvas.current.height;
    const itemWidth = width / order.length;
    const ctx = canvas.current.getContext("2d");
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
      console.log("order", order.length, "height", height);
      const realHeight = item * (height / order.length);
      ctx.fillRect(
        i * itemWidth + 1,
        height - realHeight,
        itemWidth - 1,
        realHeight
      );
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
