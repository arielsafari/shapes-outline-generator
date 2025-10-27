import { pointsToPolygon } from "@/lib/outline-calculator";
import { cn } from "@/lib/utils";
import type { CanvasSize, Point } from "@/types";

interface Props {
  canvasSize: CanvasSize;
  points: Point[];
  patternDegrees?: number;
}

export default function ShapeDisplay({
  canvasSize,
  points,
  patternDegrees = 315,
}: Props) {
  const polygon: string = pointsToPolygon(points, canvasSize);

  const backgroundPattern = `
    bg-[repeating-linear-gradient(var(--pattern-deg),var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
    bg-size-[10px_10px]
    bg-fixed 
    [--pattern-fg:var(--color-white)]/30
  `;

  return (
    <div
      className={cn("absolute inset-0", backgroundPattern)}
      style={
        {
          width: canvasSize.width,
          height: canvasSize.height,
          clipPath: `polygon(${polygon})`,
          shapeOutside: `polygon(${polygon})`,
          pointerEvents: "none",
          "--pattern-deg": `${patternDegrees}deg`,
        } as React.CSSProperties
      }
    />
  );
}
