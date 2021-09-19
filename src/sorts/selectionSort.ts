import { colors } from "../globals";
import { SortResponse } from "../types";
import { swap } from "../utils/swap";

export function* selectionSort(
  array: number[]
): IterableIterator<SortResponse> {
  let index = 0;
  let sortedIndexes = [];
  let cursor = sortedIndexes.length + 1;
  let mutableArray = array;

  while (sortedIndexes.length < array.length) {
    const thisItem = mutableArray[index];
    const nextItem = mutableArray[cursor];
    if (thisItem > nextItem) {
      mutableArray = swap(mutableArray, index, cursor);
    }

    if (cursor === array.length - 1 || index === array.length - 1) {
      sortedIndexes.push(index);
      cursor = sortedIndexes.length; // (sortedIndexes.length - 1) + 1
      index++;
    }

    cursor++;
    yield {
      newOrder: mutableArray,
      highlights: [
        { index: index, color: colors.compare },
        { index: cursor, color: colors.compare },
      ],
      alreadySortedIndexes: sortedIndexes,
    };
  }
}
