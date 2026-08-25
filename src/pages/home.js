import { Link } from "react-router-dom";
import posts from "../posts/posts";

export default function Home() {
  return <main className="blog-home"><header><h1>나의 블로그</h1><nav aria-label="주요 메뉴"><Link to="/todo">Todo</Link><Link to="/canvas">Canvas 실험</Link></nav></header><section aria-labelledby="post-list-title"><h2 id="post-list-title">글 목록</h2><ul className="post-list">{posts.map((post) => <li key={post.slug}><Link to={`/post/${post.slug}`}>{post.title}</Link><p>{post.summary}</p></li>)}</ul></section></main>;
}
