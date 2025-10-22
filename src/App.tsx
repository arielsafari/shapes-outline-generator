type FloatValue = "start" | "end";

interface Rectangle {
  width: number;
  height: number;
  float: FloatValue;
}

interface Point {
  x: number;
  y: number;
}

export default function App() {
  const rectangles: Rectangle[] = [
    { width: 200, height: 100, float: "start" },
    { width: 300, height: 150, float: "start" },
    { width: 150, height: 50, float: "start" },
    { width: 150, height: 50, float: "end" },
    { width: 200, height: 100, float: "end" },
  ];

  const points: Point[] = [
    { x: 0, y: 0 },
    { x: 200, y: 0 },
    { x: 200, y: 100 },
    { x: 300, y: 100 },
    { x: 300, y: 250 },
    { x: 150, y: 250 },
    { x: 150, y: 300 },
    { x: 0, y: 300 },
  ];

  return (
    <div className="bg-gray-900 py-12 flex min-h-svh flex-col items-center gap-10 text-white">
      <h1 className="mx-auto mt-2 text-center text-4xl font-semibold tracking-tight text-balance">
        Shapes Outline Generator
      </h1>

      <div className="w-4xl rounded-xl p-1 inset-ring bg-white/10 inset-ring-white/10">
        <div className="p-8 h-[400px] rounded-lg outline outline-white/5 bg-gray-950/50 inset-ring inset-ring-white/5">
          <div className="relative">
            <div className="float-start">
              {rectangles
                .filter((r) => r.float == "start")
                .map((rectangle, i) => (
                  <div
                    key={i}
                    className="bg-blue-500 border"
                    style={{
                      width: rectangle.width,
                      height: rectangle.height,
                    }}
                  />
                ))}
            </div>
            <div className="float-end">
              {rectangles
                .filter((r) => r.float == "end")
                .map((rectangle, i) => (
                  <div
                    key={i}
                    className="bg-cyan-500 border float-end clear-both"
                    style={{
                      width: rectangle.width,
                      height: rectangle.height,
                    }}
                  />
                ))}
            </div>

            <div className="absolute inset-0">
              {points.map((p, i) => (
                <span
                  key={i}
                  className="absolute text-xs rounded-tl-none bg-gray-200 text-black rounded px-1 py-0.5 border border-pink-600 pointer-events-none shadow-md"
                  style={{
                    top: p.y,
                    insetInlineStart: p.x,
                  }}
                >
                  <div className="bg-linear-to-br from-pink-600 to-transparent from-20% to-50% absolute inset-0 size-1.5" />
                  {p.x}/{p.y}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
