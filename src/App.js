import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const posts = [
  { slug: "1st", title: "첫 번째 글" },
  { slug: "second-post", title: "두 번째 글" },
];

function App() {
  const [currentSlug, setCurrentSlug] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (currentSlug) {
      import(`./posts/${currentSlug}.md`)
        .then((res) => fetch(res.default))
        .then((res) => res.text())
        .then((text) => setContent(text));
    }
  }, [currentSlug]);

  return (
    <div style={{ padding: 24 }}>
      <h1>📝 내 블로그</h1>

      {currentSlug === null ? (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <button onClick={() => setCurrentSlug(post.slug)}>
                {post.title}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <button onClick={() => setCurrentSlug(null)}>← 목록으로</button>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default App;