import { colors } from '../globals';
import { SortResponse } from '../types';
import { swap } from '../utils/swap';

export function* bubbleSort(array: number[]): IterableIterator<SortResponse> {
  let index = 0;
  const sortedIndexes: number[] = [];
  let mutableArray = array;

  while (sortedIndexes.length < array.length) {
    const thisIdx = index;
    const nextIdx = index + 1;
    const thisItem = mutableArray[thisIdx];
    const nextItem = mutableArray[nextIdx];
    if (thisItem > nextItem) {
      mutableArray = swap(mutableArray, thisIdx, nextIdx);
    }

    if (index === 0 && sortedIndexes.find((i) => i === nextIdx)) {
      sortedIndexes.push(thisIdx);
    } else if (nextIdx + 1 === array.length - sortedIndexes.length) {
      sortedIndexes.push(nextIdx);

      index = 0;
    } else {
      index++;
    }
    yield {
      newOrder: mutableArray,
      highlights: [
        { index: thisIdx, color: colors.compare },
        { index: nextIdx, color: colors.compare },
      ],
      alreadySortedIndexes: sortedIndexes,
    };
  }
}
