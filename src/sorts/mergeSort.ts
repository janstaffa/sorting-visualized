import { SortResponse } from '../types';

export function* mergeSort(array: number[]): IterableIterator<SortResponse> {
  const arrayLength = array.length;
  let curr_size;
  let left_start;

  for (curr_size = 1; curr_size <= arrayLength - 1; curr_size *= 2) {
    for (
      left_start = 0;
      left_start < arrayLength - 1;
      left_start += 2 * curr_size
    ) {
      const mid = Math.min(left_start + curr_size - 1, arrayLength - 1);

      const right_end = Math.min(
        left_start + 2 * curr_size - 1,
        arrayLength - 1
      );

      // merge sub-arrays
      let i, j, k;
      const n1 = mid - left_start + 1;
      const n2 = right_end - mid;

      const L = [n1];
      const R = [n2];

      for (i = 0; i < n1; i++) L[i] = array[left_start + i];
      for (j = 0; j < n2; j++) R[j] = array[mid + 1 + j];

      i = 0;
      j = 0;
      k = left_start;
      while (i < n1 && j < n2) {
        let secondIdx = i;
        if (L[i] <= R[j]) {
          secondIdx = array.indexOf(L[i]);
          array[k] = L[i];
          i++;
        } else {
          secondIdx = array.indexOf(R[j]);
          array[k] = R[j];
          j++;
        }
        yield {
          alreadySortedIndexes: [],
          highlights: [
            { index: k, color: '#ffff00' },
            { index: secondIdx, color: '#ffff00' },
            { index: left_start, color: '#00ffff' },
            { index: right_end, color: '#00ffff' },
          ],
          newOrder: array,
        };
        k++;
      }

      while (i < n1) {
        array[k] = L[i];
        i++;
        k++;
      }

      while (j < n2) {
        array[k] = R[j];
        j++;
        k++;
      }
    }
  }

  let sorted = true;
  for (let idx = 0; idx < array.length; idx++) {
    if (array[idx] > 1 && array[idx] !== array[idx - 1] + 1) {
      sorted = false;
      break;
    }
  }
  console.log('here', sorted);
  if (sorted) {
    yield {
      alreadySortedIndexes: Array.from(Array(array.length).keys()),
      highlights: [{ index: 10, color: '#000' }],
      newOrder: array,
    };
  }
}

// const mergeSortBackup = (array: number[]) => {
//   const arrayLength = array.length;
//   let curr_size; // For current size of subarrays to be merged
//   // curr_size varies from 1 to n/2
//   let left_start; // For picking starting index of left subarray
//   // to be merged

//   // Merge subarrays in bottom up manner.  First merge subarrays of
//   // size 1 to create sorted subarrays of size 2, then merge subarrays
//   // of size 2 to create sorted subarrays of size 4, and so on.
//   for (curr_size = 1; curr_size <= arrayLength - 1; curr_size *= 2) {
//     // Pick starting point of different subarrays of current size
//     for (
//       left_start = 0;
//       left_start < arrayLength - 1;
//       left_start += 2 * curr_size
//     ) {
//       // Find ending point of left subarray. mid+1 is starting
//       // point of right
//       const mid = Math.min(left_start + curr_size - 1, arrayLength - 1);

//       const right_end = Math.min(
//         left_start + 2 * curr_size - 1,
//         arrayLength - 1
//       );

//       // Merge Subarrays arr[left_start...mid] & arr[mid+1...right_end]
//       // merge(arr, left_start, mid, right_end);

//       let i, j, k;
//       const n1 = mid - left_start + 1;
//       const n2 = right_end - mid;

//       const L = [n1];
//       const R = [n2];

//       /* Copy data to temp arrays L[] and R[] */
//       for (i = 0; i < n1; i++) L[i] = array[left_start + i];
//       for (j = 0; j < n2; j++) R[j] = array[mid + 1 + j];

//       /* Merge the temp arrays back into arr[l..r] */
//       i = 0;
//       j = 0;
//       k = left_start;
//       while (i < n1 && j < n2) {
//         if (L[i] <= R[j]) {
//           array[k] = L[i];
//           i++;
//         } else {
//           array[k] = R[j];
//           j++;
//         }
//         k++;
//       }

//       /* Copy the remaining elements of L[], if there are any */
//       while (i < n1) {
//         array[k] = L[i];
//         i++;
//         k++;
//       }

//       /* Copy the remaining elements of R[], if there are any */
//       while (j < n2) {
//         array[k] = R[j];
//         j++;
//         k++;
//       }
//     }
//   }
// };
