export type Alignment = "start" | "end";

export interface Rectangle {
  width: number;
  height: number;
  alignment: Alignment;
}

export interface Point {
  x: number;
  y: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}
