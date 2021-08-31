import React, { useState } from 'react';
import BubbleSort from './sorts/BubbleSort';
import SortWrap from './SortWrap';

const App = () => {
  const [enabledSort, setEnabledSort] = useState<number>(0);

  let EnabledSort = null;
  switch (enabledSort) {
    case 0:
      EnabledSort = (
        <SortWrap sortName="Bubble Sort">
          {(pause, speed, items, currentArray, drawState) => (
            <BubbleSort
              pause={pause}
              speed={speed}
              items={items}
              currentArray={currentArray}
              drawState={drawState}
            />
          )}
        </SortWrap>
      );
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
  }
  return (
    <div className="App">
      <h1 className="title">Sorting Visualised</h1>
      <div className="nav">
        <details>
          <summary>Table of contents:</summary>
          <hr />
          <span className="anchor" onClick={() => setEnabledSort(0)}>
            Bubble sort
          </span>
          <span className="anchor" onClick={() => setEnabledSort(1)}>
            Insertion sort
          </span>
          <span className="anchor" onClick={() => setEnabledSort(2)}>
            Merge sort
          </span>
          <span className="anchor" onClick={() => setEnabledSort(3)}>
            Quick sort
          </span>
        </details>
      </div>
      <hr />
      <main>{EnabledSort}</main>
    </div>
  );
};

export default App;
