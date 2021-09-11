export interface Highlight {
  index: number;
  color: string;
}

export interface SortResponse {
  newOrder: number[];
  highlights: Highlight[];
  alreadySorted: number;
}
