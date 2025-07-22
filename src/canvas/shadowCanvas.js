import React from "react";
import useCanvas from './useCanvas';

const width = 1000;
const height = 700;

const Canvas = ({ deltaY }) => {
    const canvasRef = useCanvas((canvas) => {
        canvas.width = width;
        canvas.height = height;
        canvas.style.background = 'black';
        const ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(width/2,0);
        ctx.arc(width / 2, 0, width*2, deltaY - Math.PI * (5 / 180), deltaY + Math.PI * (5 / 180));
        ctx.closePath();
        ctx.fillStyle = "yellow";
        ctx.fill();
    });

    return (
        <canvas ref={canvasRef} />
    )
};

export default Canvas;