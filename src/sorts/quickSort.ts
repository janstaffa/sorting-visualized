import { colors } from '../globals';
import { SortResponse } from '../types';

export function* quickSort(array: number[]): IterableIterator<SortResponse> {
  const sortedIndexes: number[] = [];
  let l = 0;
  let h = array.length - 1;
  let stack = new Array(h - l + 1);
  stack.fill(0);

  let top = -1;

  stack[++top] = l;
  stack[++top] = h;

  while (top >= 0) {
    h = stack[top--];
    l = stack[top--];

    //  let p = partition(array, l, h);

    let temp;
    const pivotIdx = h;
    let pivot = array[pivotIdx];

    yield {
      newOrder: array,
      highlights: [
        {
          index: pivotIdx,
          color: colors.pivot,
        },
        {
          index: h,
          color: colors.boundary,
        },
        {
          index: l,
          color: colors.boundary,
        },
      ],
      alreadySortedIndexes: sortedIndexes,
    };

    let i = l - 1;
    for (let j = l; j <= h - 1; j++) {
      if (array[j] <= pivot) {
        i++;

        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        yield {
          newOrder: array,
          highlights: [
            {
              index: i,
              color: colors.compare,
            },
            {
              index: j,
              color: colors.compare,
            },
          ],
          alreadySortedIndexes: sortedIndexes,
        };
      }
    }

    temp = array[i + 1];
    array[i + 1] = array[pivotIdx];
    array[pivotIdx] = temp;
    let p = i + 1;

    if (p - 1 > l) {
      stack[++top] = l;
      stack[++top] = p - 1;
    }

    if (p + 1 < h) {
      stack[++top] = p + 1;
      stack[++top] = h;
    }

    sortedIndexes.push(p);
  }
  let sorted = true;
  for (let idx = 0; idx < array.length; idx++) {
    if (array[idx] > 1 && array[idx] !== array[idx - 1] + 1) {
      sorted = false;
      break;
    }
  }
  if (sorted) {
    yield {
      alreadySortedIndexes: Array.from(Array(array.length).keys()),
      highlights: [],
      newOrder: array,
    };
  }
}

// source: https://www.geeksforgeeks.org/iterative-quick-sort/
// /* A[] --> Array to be sorted,
// l --> Starting index,
// h --> Ending index */
// const quickSortIterative = (arr: number[], l: number, h: number) => {
//   // Create an auxiliary stack
//   let newArray: number[] = arr;
//   let stack = new Array(h - l + 1);
//   stack.fill(0);

//   // initialize top of stack
//   let top = -1;

//   // push initial values of l and h to
//   // stack
//   stack[++top] = l;
//   stack[++top] = h;

//   // Keep popping from stack while
//   // is not empty
//   while (top >= 0) {
//     // Pop h and l
//     h = stack[top--];
//     l = stack[top--];

//     // Set pivot element at its
//     // correct position in
//     // sorted array
//     let p = partition(newArray, l, h);

//     // If there are elements on
//     // left side of pivot, then
//     // push left side to stack
//     if (p - 1 > l) {
//       stack[++top] = l;
//       stack[++top] = p - 1;
//     }

//     // If there are elements on
//     // right side of pivot, then
//     // push right side to stack
//     if (p + 1 < h) {
//       stack[++top] = p + 1;
//       stack[++top] = h;
//     }
//   }
//   return newArray;
// };
