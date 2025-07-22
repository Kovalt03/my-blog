import { useRef, useEffect } from "react";

const useCanvas = (setCanvas) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(canvas){
            setCanvas(canvas);
        }
    }, [setCanvas]);

    return canvasRef;
};

export default useCanvas;