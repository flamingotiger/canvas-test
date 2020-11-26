import React, { useRef } from "react";
import "./App.css";
import { useEffect } from "react";
import Canvas from "./base/Canvas";
import DragArea from "./utils/DragArea";
import Vector from "./base/Vector";
import Dimension from "./base/Dimension";
import DrawRect from "./utils/DrawRect";

function App() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return undefined;
    const canvas = new Canvas(canvasRef.current);
    const dragArea = new DragArea(new Vector(0, 0));
    [
      { vector: [10, 20], dimension: [100, 160] },
      { vector: [220, 30], dimension: [220, 120] },
      { vector: [330, 240], dimension: [320, 200] },
      { vector: [440, 450], dimension: [120, 300] },
    ].forEach((r) => {
      const a = new DrawRect(new Vector(...r.vector), new Dimension(...r.dimension));
      canvas.entityManager.addEntity(a);
    });
    canvas.entityManager.addEntity(dragArea);
    canvas.play();
    return () => canvas.pause();
  }, [canvasRef]);

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        id="canvas"
        width={1000}
        height={800}
        style={{ border: "1px solid red" }}
      />
    </div>
  );
}

export default App;
