import { cn } from "@/lib/utils";
import type { Alignment, CanvasSize, Point } from "@/types";

function getDirectionProperties(
  alignment: Alignment,
  p: Point,
  canvasSize: CanvasSize
) {
  if (alignment === "start") {
    return {
      insetInline: { left: p.x },
      gradient: "bg-linear-to-br",
      rounded: "rounded rounded-tl-none",
      arrow: "left-0",
    };
  }

  return {
    insetInline: { right: canvasSize.width - p.x },
    gradient: "bg-linear-to-bl",
    rounded: "rounded rounded-tr-none",
    arrow: "right-0",
  };
}

interface Props {
  canvasSize: CanvasSize;
  alignment: Alignment;
  points: Point[];
}

export default function PointsDisplay({
  canvasSize,
  alignment,
  points,
}: Props) {
  return (
    <div className="absolute inset-0">
      {points.map((p, i) => {
        const direction = getDirectionProperties(alignment, p, canvasSize);
        return (
          <span
            key={i}
            className={cn(
              direction.rounded,
              "absolute text-xs bg-gray-200 text-black px-1 py-0.5 border border-pink-600 pointer-events-none shadow-md"
            )}
            style={{
              ...direction.insetInline,
              top: p.y,
            }}
          >
            <div
              className={cn(
                direction.gradient,
                direction.arrow,
                "from-pink-600 to-transparent from-20% to-50% absolute top-0 size-1.5"
              )}
            />
            {p.x}/{p.y}
          </span>
        );
      })}
    </div>
  );
}
