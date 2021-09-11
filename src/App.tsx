import React, { useEffect, useRef, useState } from 'react';
import { BottomBar } from './components/BottomBar';
import { Navbar } from './components/Navbar';
import { Sort } from './components/Sort';
import { bubbleSort } from './sorts/bubbleSort';
import './styles/App.css';
import { Highlight, SortResponse } from './types';
import { getRandomList } from './utils/randomList';

const App = () => {
  const [enabledSort, setEnabledSort] = useState<number>(0);
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const currentArrayRef = useRef<number[]>(currentArray);
  currentArrayRef.current = currentArray;
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [items, setItems] = useState<number>(20);
  const [speed, setSpeed] = useState<number>(2);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [comparisons, setComparisons] = useState<number>(0);
  const comparisonsRef = useRef<number>(comparisons);
  comparisonsRef.current = comparisons;
  const [sort, setSort] = useState<IterableIterator<SortResponse>>();
  const [sortLoop, setSortLoop] = useState<NodeJS.Timeout>();
  const sortLoopRef = useRef<NodeJS.Timeout>();
  const [alreadySorted, setAlreadySorted] = useState<number>(0);
  sortLoopRef.current = sortLoop;

  const reset = () => {
    setIsPaused(true);
    const randomList = getRandomList(items);
    setSort(bubbleSort(randomList));
    setCurrentArray(randomList);
    setHighlights([]);
    setIsSorted(false);
    setComparisons(0);
    setAlreadySorted(0);
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
      const { value, done } = sort.next() as {
        value: SortResponse;
        done?: boolean;
      };
      setComparisons(comparisonsRef.current + 1);
      const newOrder = value.newOrder;

      setCurrentArray(newOrder);
      let newHighlights = [...value.highlights];
      if (value.alreadySorted === newOrder.length) {
        clearInterval(timer);
        setIsPaused(true);
        setIsSorted(true);
        newHighlights = [];
      }
      setAlreadySorted(value.alreadySorted);
      if (value.alreadySorted > 0) {
        for (
          let i = newOrder.length;
          i > newOrder.length - value.alreadySorted;
          i--
        ) {
          newHighlights.push({ index: i - 1, color: '#00ff00' });
        }
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
  return (
    <div className="App">
      <div className="app-wrap">
        <Navbar
          enabledSort={enabledSort}
          setEnabledSort={setEnabledSort}
          items={items}
          setItems={setItems}
          speed={speed}
          setSpeed={setSpeed}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          isSorted={isSorted}
          reset={reset}
        />
        <Sort order={currentArray} highlights={highlights} />
        <BottomBar
          comparisons={comparisons}
          speed={speed}
          items={items}
          alreadySorted={alreadySorted}
        />
      </div>
    </div>
  );
};

export default App;
