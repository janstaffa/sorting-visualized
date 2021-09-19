import React, { useEffect, useRef, useState } from "react";
import { BottomBar } from "./components/BottomBar";
import { Navbar } from "./components/Navbar";
import { Sort } from "./components/Sort";
import { maxItems, maxSpeed, minItems, minSpeed } from "./globals";
import { bubbleSort } from "./sorts/bubbleSort";
import { insertionSort } from "./sorts/insertionSort";
import { mergeSort } from "./sorts/mergeSort";
import { selectionSort } from "./sorts/selectionSort";
import "./styles/App.css";
import { Highlight, SortResponse } from "./types";
import { getRandomList } from "./utils/randomList";

const App = () => {
  const [enabledSort, setEnabledSort] = useState<number>(0);
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const currentArrayRef = useRef<number[]>(currentArray);
  currentArrayRef.current = currentArray;
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [items, setItems] = useState<number>(20);
  const itemsRef = useRef<number>(items);
  itemsRef.current = items;
  const [speed, setSpeed] = useState<number>(2);
  const speedRef = useRef<number>(speed);
  speedRef.current = speed;
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const isPausedRef = useRef<boolean>(isPaused);
  isPausedRef.current = isPaused;
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const isSortedRef = useRef<boolean>(isSorted);
  isSortedRef.current = isSorted;
  const [comparisons, setComparisons] = useState<number>(0);
  const comparisonsRef = useRef<number>(comparisons);
  comparisonsRef.current = comparisons;
  const [sort, setSort] = useState<IterableIterator<SortResponse>>();
  const [sortLoop, setSortLoop] = useState<NodeJS.Timeout>();
  const sortLoopRef = useRef<NodeJS.Timeout>();
  const [alreadySorted, setAlreadySorted] = useState<number[]>([]);
  sortLoopRef.current = sortLoop;

  const getSortName = (sortId: number) => {
    switch (sortId) {
      case 0:
        return "Bubble sort";
      case 1:
        return "Selection sort";
      case 2:
        return "Insertion sort";
      case 3:
        return "Merge sort";
      default:
        return "";
    }
  };

  const getSort = (sortId: number, array: number[]) => {
    switch (sortId) {
      case 0:
        return bubbleSort(array);
      case 1:
        return selectionSort(array);
      case 2:
        return insertionSort(array);
      case 3:
        return mergeSort(array);
      default:
        return undefined;
    }
  };
  const reset = () => {
    setIsPaused(true);
    const randomList = getRandomList(items);
    const algo = getSort(enabledSort, randomList);
    if (algo) {
      setSort(algo);
    }
    setCurrentArray(randomList);
    setHighlights([]);
    setIsSorted(false);
    setComparisons(0);
    setAlreadySorted([]);
  };
  useEffect(() => {
    reset();
  }, [items]);

  useEffect(() => {
    if (!sort) return;
    if (isPaused) {
      if (sortLoopRef.current) {
        clearInterval(sortLoopRef.current);
      }
      return;
    }
    const timer = setInterval(() => {
      const { value } = sort.next() as {
        value: SortResponse;
        done?: boolean;
      };
      setComparisons(comparisonsRef.current + 1);
      const newOrder = value.newOrder;
      setCurrentArray(newOrder);

      let newHighlights = [...value.highlights];
      if (value.alreadySortedIndexes.length === newOrder.length) {
        clearInterval(timer);
        setIsPaused(true);
        setIsSorted(true);
        newHighlights = [];
      }
      setAlreadySorted(value.alreadySortedIndexes);
      if (value.alreadySortedIndexes.length > 0) {
        value.alreadySortedIndexes.forEach((index) => {
          newHighlights.push({ index, color: "#00ff00" });
        });
      }
      setHighlights(newHighlights);
    }, 1000 / speed);
    setSortLoop(timer);

    return () => {
      if (sortLoopRef.current) {
        clearInterval(sortLoopRef.current);
      }
    };
  }, [sort, isPaused, speed]);

  useEffect(() => {
    reset();
  }, [enabledSort]);

  const playPause = () => {
    if (isSortedRef.current) {
      reset();
    }
    setIsPaused(!isPausedRef.current);
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case " ":
          playPause();
          break;
        case "ArrowRight":
          if (speedRef.current < maxSpeed) {
            setSpeed(speedRef.current + 1);
          }
          break;
        case "ArrowLeft":
          if (speedRef.current > minSpeed) {
            setSpeed(speedRef.current - 1);
          }
          break;
        case "+":
          if (itemsRef.current < maxItems) {
            setItems(itemsRef.current + 1);
          }
          break;
        case "-":
          if (itemsRef.current > minItems) {
            setItems(itemsRef.current - 1);
          }
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="app-wrap">
        <Navbar
          setEnabledSort={setEnabledSort}
          items={items}
          setItems={setItems}
          speed={speed}
          setSpeed={setSpeed}
          isPaused={isPaused}
          reset={reset}
          playPause={playPause}
        />
        <Sort order={currentArray} highlights={highlights} />
        <BottomBar
          comparisons={comparisons}
          speed={speed}
          items={items}
          alreadySorted={alreadySorted.length}
          sortName={getSortName(enabledSort)}
        />
      </div>
    </div>
  );
};

export default App;
