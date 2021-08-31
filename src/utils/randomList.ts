export const getRandomList = (length: number) => {
  const response = Array.from({ length }, (x, i) => i + 1);
  for (let i = response.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = response[i];
    response[i] = response[j];
    response[j] = temp;
  }
  return response;
};
