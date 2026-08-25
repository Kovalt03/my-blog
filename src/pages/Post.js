import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import posts from "../posts/posts";

export default function Post() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);
  if (!post) return <main className="post"><h1>글을 찾을 수 없습니다.</h1><Link to="/">글 목록으로 돌아가기</Link></main>;
  return <article className="post"><Link to="/">← 글 목록</Link><h1>{post.title}</h1><ReactMarkdown>{post.content}</ReactMarkdown></article>;
}
