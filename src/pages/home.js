import { Link } from "react-router-dom";

const posts = [
  { title: "첫 번째 글", slug: "first-post" },
  { title: "두 번째 글", slug: "second-post" }
];

export default function Home() {
  return (
    <div>
      <h1>블로그</h1>
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
