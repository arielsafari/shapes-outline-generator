import type { CanvasSize, Point, Rectangle } from "@/types";

export function getOutlinePoints(
  rectangles: Rectangle[],
  canvasSize: CanvasSize
): Point[] {
  if (rectangles.length === 0) return [];

  const order = { start: 0, end: 1 };
  const rects = rectangles
    .slice()
    .sort((a, b) => order[a.alignment] - order[b.alignment]);

  const points: Point[] = [];
  const leftXFor = (baseX: number, width: number) =>
    baseX === 0 ? width : baseX - width;

  let baseX = rects[0].alignment === "start" ? 0 : canvasSize.width;
  let currentY = 0;

  // start baseline for the first run
  points.push({ x: baseX, y: 0 });
  points.push({ x: leftXFor(baseX, rects[0].width), y: 0 });

  for (let i = 0; i < rects.length; i++) {
    const current = rects[i];
    const next = rects[i + 1];

    currentY += current.height;
    points.push({ x: leftXFor(baseX, current.width), y: currentY });

    if (next && next.width !== current.width) {
      points.push({ x: leftXFor(baseX, next.width), y: currentY });
    }

    if (next && next.alignment !== current.alignment) {
      // close current run vertically and reset for the next run
      points.push({ x: baseX, y: currentY }, { x: baseX, y: 0 });

      baseX = canvasSize.width;
      currentY = 0;

      points.push({ x: baseX, y: 0 }, { x: leftXFor(baseX, next.width), y: 0 });
    }
  }

  // final close
  points.push({ x: baseX, y: currentY }, { x: baseX, y: 0 });

  return points;
}

export function pointsToPolygon(
  points: Point[],
  canvasSize: CanvasSize
): string {
  return points
    .map(
      (p) =>
        `${(p.x / canvasSize.width) * 100}% ${(p.y / canvasSize.height) * 100}%`
    )
    .join(", ");
}

export function getInvertedOutlinePoints(
  startPoints: Point[],
  endPoints: Point[],
  canvasSize: CanvasSize
): Point[] {
  const outer: Point[] = [
    { x: 0, y: 0 },
    { x: 0, y: canvasSize.height },
    { x: canvasSize.width, y: canvasSize.height },
    { x: canvasSize.width, y: 0 },
  ];

  if (
    !startPoints ||
    startPoints.length === 0 ||
    !endPoints ||
    endPoints.length === 0
  )
    return outer;

  let innerReversed = startPoints.slice();
  innerReversed = innerReversed.concat(outer);
  innerReversed = innerReversed.concat(endPoints.slice().reverse());

  return innerReversed;
}
