import { cn } from "@/lib/utils";
import type { Alignment, CanvasSize, Rectangle } from "@/types";

interface Props {
  canvasSize: CanvasSize;
  rectangles: Rectangle[];
  alignment: Alignment;
}

export default function RectanglesDisplay({ rectangles, alignment }: Props) {
  const float = alignment === "start" ? "float-start" : "float-end";
  return (
    <div className={float}>
      {rectangles.map((rectangle, i) => (
        <div
          key={i}
          className={cn("bg-cyan-500 border clear-both", float)}
          style={{
            width: rectangle.width,
            height: rectangle.height,
          }}
        />
      ))}
    </div>
  );
}
