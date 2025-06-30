import { Link } from "react-router-dom";
import React, { useState } from "react";

const posts = [
  { title: "첫 번째 글", slug: "first-post" },
  { title: "두 번째 글", slug: "second-post" }
];

const ScrollDetector = () => {
  const [ScrollY, setScrollY] = useState(0);

  const handleWheel = (e) => {
    setScrollY((prev) => prev + e.deltaY);
  }
};

useEffect(() => {
  window.addEventListener("wheel", handleWheel);
  return () => window.removeEventListener("wheel", handleWheel);
}, []);

export default function Home() {
  return (
    <div>
      <h1>블로그</h1>
      <div>
        <h2>username</h2>
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link to={`/post/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
