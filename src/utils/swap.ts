export const swap = (array: number[], i1: number, i2: number) => {
  const newArray = array;
  const temp = array[i1];
  newArray[i1] = array[i2];
  newArray[i2] = temp;
  return newArray;
};
