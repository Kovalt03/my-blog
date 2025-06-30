import React from "react";
import { Wrapper } from './style';
import useCanvas from '@/src/canvas/useCanvas';

const width = 1000;
const height = 700;

const Canvas = () => {
    const canvasRef = useCanvas((canvas) => {
        canvas.width = width;
        canvas.height = height;
        canvas.style.background = black;
    });

    return (
        <Wrapper>
            <canvas ref={canvasRef} />
        </Wrapper>
    )
};

export default Canvas;