import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Canvas from "./canvas/shadowCanvas";
import Home from "./pages/home";
import Post from "./pages/Post";
import Todo from "./todo/Todo";

function CanvasPage() {
  return <main className="canvas-page"><h1>빛의 각도 실험</h1><p>캔버스 위에서 마우스 휠을 움직여 빛의 각도를 조절하세요.</p><Canvas /><Link to="/">블로그로 돌아가기</Link></main>;
}

export default function App() {
  return <Routes><Route path="/" element={<Home />} /><Route path="/post/:slug" element={<Post />} /><Route path="/todo" element={<Todo />} /><Route path="/canvas" element={<CanvasPage />} /><Route path="*" element={<Home />} /></Routes>;
}
