import { useEffect, useRef, useState } from "react";

const WIDTH = 1000;
const HEIGHT = 700;
const MIN_ANGLE = Math.PI * (5 / 180);
const MAX_ANGLE = Math.PI * (175 / 180);

export default function Canvas() {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(Math.PI);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.fillStyle = "#111";
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.beginPath();
    context.moveTo(WIDTH / 2, 0);
    context.arc(WIDTH / 2, 0, WIDTH * 2, angle - MIN_ANGLE, angle + MIN_ANGLE);
    context.closePath();
    context.fillStyle = "#facc15";
    context.fill();
  }, [angle]);

  function handleWheel(event) {
    event.preventDefault();
    setAngle((previous) => Math.max(MIN_ANGLE, Math.min(MAX_ANGLE, previous + event.deltaY * 0.01)));
  }

  return <div className="canvas-wrapper" onWheel={handleWheel}><p aria-live="polite">현재 각도: {Math.round((angle * 180) / Math.PI)}°</p><canvas ref={canvasRef} aria-label="빛의 각도를 시각화한 캔버스" /></div>;
}
