import React, { useEffect, useState } from "react";
import { BottomBar } from "./components/BottomBar";
import { Navbar } from "./components/Navbar";
import { getRandomList } from "./utils/randomList";
import "./styles/App.css";
import { Highlight, Sort } from "./components/Sort";

const App = () => {
  const [enabledSort, setEnabledSort] = useState<number>(0);
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [items, setItems] = useState<number>(20);
  const [speed, setSpeed] = useState<number>(2);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [comparisons, setComparisons] = useState<number>(0);

  const reset = () => {
    setIsPaused(true);
    setCurrentArray(getRandomList(items));
    setIsSorted(false);
    setComparisons(0);
  };
  useEffect(() => {
    setCurrentArray([1, 2, 3, 4, 5, 20, 100, 6, 8, 12, 7]);
  }, []);
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
        <Sort
          order={currentArray}
          highlights={[{ index: 1, color: "#00ff00" }] || highlights}
        />
        <BottomBar comparisons={comparisons} speed={speed} />
      </div>
    </div>
  );
};

export default App;
