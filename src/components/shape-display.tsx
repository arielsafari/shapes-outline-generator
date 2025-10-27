import { pointsToPolygon } from "@/lib/outline-calculator";
import type { CanvasSize, Point } from "@/types";

interface Props {
  canvasSize: CanvasSize;
  points: Point[];
}

export default function ShapeDisplay({ canvasSize, points }: Props) {
  const polygon: string = pointsToPolygon(points, canvasSize);

  return (
    <div
      className="absolute inset-0 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-white)]/30"
      style={{
        width: canvasSize.width,
        height: canvasSize.height,
        clipPath: `polygon(${polygon})`,
        shapeOutside: `polygon(${polygon})`,
        pointerEvents: "none",
      }}
    />
  );
}
