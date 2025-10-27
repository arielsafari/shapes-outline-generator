import PointsDisplay from "@/components/points-display";
import RectanglesDisplay from "@/components/rectangles-display";
import ShapeDisplay from "@/components/shape-display";
import { getOutlinePoints } from "@/lib/outline-calculator";
import type { CanvasSize, Point, Rectangle } from "@/types";

export default function App() {
  const startRectangles: Rectangle[] = [
    { width: 200, height: 100, alignment: "start" },
    { width: 300, height: 150, alignment: "start" },
    { width: 150, height: 50, alignment: "start" },
  ];

  const endRectangles: Rectangle[] = [
    { width: 150, height: 50, alignment: "end" },
    { width: 250, height: 100, alignment: "end" },
  ];

  const canvasSize: CanvasSize = { width: 824, height: 350 };

  const startPoints: Point[] = getOutlinePoints(startRectangles, canvasSize);
  const endPoints: Point[] = getOutlinePoints(endRectangles, canvasSize);

  return (
    <div className="bg-gray-900 py-12 flex min-h-svh flex-col items-center gap-10 text-white">
      <h1 className="mx-auto mt-2 text-center text-4xl font-semibold tracking-tight text-balance">
        Shapes Outline Generator
      </h1>

      <div className="rounded-xl p-1 inset-ring bg-white/10 inset-ring-white/10">
        <div className="p-8 rounded-lg outline outline-white/5 bg-gray-950/50 inset-ring inset-ring-white/5">
          <div
            className="relative bg-white/10 outline outline-white/30"
            style={{ width: canvasSize.width, height: canvasSize.height }}
          >
            <RectanglesDisplay
              canvasSize={canvasSize}
              rectangles={startRectangles}
              alignment="start"
            />
            <RectanglesDisplay
              canvasSize={canvasSize}
              rectangles={endRectangles}
              alignment="end"
            />

            <PointsDisplay
              points={startPoints}
              canvasSize={canvasSize}
              alignment="start"
            />
            <PointsDisplay
              points={endPoints}
              canvasSize={canvasSize}
              alignment="end"
            />

            <ShapeDisplay canvasSize={canvasSize} points={startPoints} />
            <ShapeDisplay canvasSize={canvasSize} points={endPoints} />
          </div>
        </div>
      </div>
    </div>
  );
}
