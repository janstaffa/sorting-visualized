import { SortResponse } from '../types';
import { swap } from '../utils/swap';

export function* bubbleSort(array: number[]): IterableIterator<SortResponse> {
  let index = 0;
  let sorted = 0;
  let mutableArray = array;

  while (true) {
    const thisIdx = index;
    const nextIdx = index + 1;
    const thisItem = mutableArray[thisIdx];
    const nextItem = mutableArray[nextIdx];
    if (thisItem > nextItem) {
      mutableArray = swap(mutableArray, thisIdx, nextIdx);
    }

    if (nextIdx === array.length - (sorted + 1)) {
      if (index === 0) {
        sorted += 2;
      } else {
        sorted++;
      }
      index = 0;
    } else {
      index++;
    }
    yield {
      newOrder: mutableArray,
      highlights: [
        { index: thisIdx, color: '#ffff00' },
        { index: nextIdx, color: '#ffff00' },
      ],
      alreadySorted: sorted,
    };
  }
}
