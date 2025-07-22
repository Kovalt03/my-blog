import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css"
import Canvas from "./canvas/shadowCanvas";
import { Link, Routes, Route } from "react-router-dom";
import Todo from './todo/Todo';

const App = () => {
  const [ShadowAngle, setShadowAngle] = useState(Math.PI);
  const [deltaY, setDeltaY] = useState(0);

  const handleWheel = (e) => {
    setShadowAngle((prev) =>{
      const delta = e.deltaY * 0.01;
      const min = Math.PI * (5 / 180); // 15도
      const max = Math.PI * (175 / 180); // 175도
      return Math.max(min, Math.min(max, prev + delta));
    });
  };

  useEffect(() => {
    window.addEventListener("click", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={
          <div>
            <h1 className="glow-text">{ShadowAngle}</h1>
            <Canvas deltaY={ShadowAngle} />
            <Link to="/todo">Go to Todo Page</Link>
          </div>
        } />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  )
}

export default App;