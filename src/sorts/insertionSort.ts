import { colors } from '../globals';
import { SortResponse } from '../types';
import { swap } from '../utils/swap';

export function* insertionSort(
  array: number[]
): IterableIterator<SortResponse> {
  let sortedIndexes: number[] = [];
  let cursor = 1;
  let mutableArray = array;
  let isNested = false;
  let nestedIndex = 0;

  const compare = (thisIdx: number, previousIdx: number) => {
    const thisItem = mutableArray[thisIdx];
    const previousItem = mutableArray[previousIdx];
    if (thisItem < previousItem) {
      return true;
    }
    return false;
  };
  while (sortedIndexes.length < array.length) {
    // error ???
    let thisIdx = 0;
    let previousIdx = 0;
    if (isNested) {
      thisIdx = nestedIndex;
      previousIdx = nestedIndex - 1;
      const shouldSwap = compare(thisIdx, previousIdx);
      if (shouldSwap) {
        mutableArray = swap(mutableArray, thisIdx, previousIdx);
        nestedIndex--;
      } else {
        isNested = false;
        nestedIndex = 0;
      }
    } else {
      thisIdx = cursor;
      previousIdx = cursor - 1;

      const shouldSwap = compare(thisIdx, previousIdx);
      if (shouldSwap) {
        mutableArray = swap(mutableArray, thisIdx, previousIdx);
        nestedIndex = previousIdx;
        isNested = true;
      }
      if (cursor === array.length) {
        sortedIndexes = Array.from(Array(mutableArray.length).keys());
      }
      cursor++;
    }
    yield {
      newOrder: mutableArray,
      highlights: [
        { index: thisIdx, color: colors.compare },
        { index: previousIdx, color: colors.compare },
        { index: cursor - 1, color: colors.boundary },
      ],
      alreadySortedIndexes: sortedIndexes,
    };
  }
}
