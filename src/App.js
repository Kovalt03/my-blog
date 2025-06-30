import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const posts = [
  { slug: "1st", title: "첫 번째 글" },
  { slug: "second-post", title: "두 번째 글" },
];

const App = () => {
  const [ShadowAngle, setShadowAngle] = useState(0);

  const handleWheel = (e) => {
    setShadowAngle((prev) =>{
      const next = Math.max(-45, Math.min(45, prev + e.deltaY * 0.1));
      return next;
    });
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="container">
      <h1 className="glow-text">{ShadowAngle}</h1>
    </div>
  )
}

export default App;