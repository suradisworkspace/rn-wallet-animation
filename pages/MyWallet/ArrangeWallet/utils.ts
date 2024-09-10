import { COL, SIZE } from "./configs";

export const getPosFromInd = (ind: number) => {
  "worklet";
  return {
    x: (ind % COL) * SIZE,
    y: Math.floor(ind / COL) * SIZE,
  };
};

export const getIndFromPos = (x: number, y: number, itemLength: number) => {
  "worklet";
  const col = Math.max(Math.round(x / SIZE), 0);
  const row = Math.max(Math.round(y / SIZE), 0);
  return Math.min(row * COL + col, itemLength - 1);
};
