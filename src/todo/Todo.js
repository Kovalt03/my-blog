import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Form from "./Form";

const FILTERS = { all: "전체", active: "진행 중", completed: "완료" };
const STORAGE_KEY = "my-blog-tasks";

function TodoItem({ task, toggleTaskCompleted, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);
  function submitEdit(event) { event.preventDefault(); const trimmedName = newName.trim(); if (!trimmedName) return; editTask(task.id, trimmedName); setIsEditing(false); }
  if (isEditing) return <li className="todo"><form className="stack-small" onSubmit={submitEdit}><div className="form-group"><label className="todo-label" htmlFor={`edit-${task.id}`}>{task.name} 수정</label><input id={`edit-${task.id}`} className="todo-text" type="text" value={newName} onChange={(event) => setNewName(event.target.value)} /></div><div className="btn-group"><button type="button" className="btn todo-cancel" onClick={() => { setNewName(task.name); setIsEditing(false); }}>취소</button><button type="submit" className="btn btn__primary todo-edit">저장</button></div></form></li>;
  return <li className="todo"><div className="stack-small"><div className="c-cb"><input id={task.id} type="checkbox" checked={task.completed} onChange={() => toggleTaskCompleted(task.id)} /><label className="todo-label" htmlFor={task.id}>{task.name}</label></div><div className="btn-group"><button type="button" className="btn" onClick={() => setIsEditing(true)}>수정<span className="visually-hidden"> {task.name}</span></button><button type="button" className="btn btn__danger" onClick={() => deleteTask(task.id)}>삭제<span className="visually-hidden"> {task.name}</span></button></div></div></li>;
}

export default function Todo() {
  const [tasks, setTasks] = useState(() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } });
  const [filter, setFilter] = useState("all");
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }, [tasks]);
  const visibleTasks = tasks.filter((task) => filter === "all" || (filter === "active" ? !task.completed : task.completed));
  const activeCount = tasks.filter((task) => !task.completed).length;
  const updateTask = (id, updater) => setTasks((current) => current.map((task) => task.id === id ? updater(task) : task));
  return <main className="todoapp"><h1>오늘 해야 하는 일</h1><Form addTask={(name) => setTasks((current) => [...current, { id: `todo-${nanoid()}`, name, completed: false }])} /><div className="filters btn-group stack-exception" aria-label="할 일 필터">{Object.entries(FILTERS).map(([key, label]) => <button key={key} type="button" className="btn toggle-btn" aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div><h2 id="list-heading">남은 할 일: {activeCount}개</h2><ul className="todo-list stack-large stack-exception" aria-labelledby="list-heading">{visibleTasks.map((task) => <TodoItem key={task.id} task={task} toggleTaskCompleted={(id) => updateTask(id, (item) => ({ ...item, completed: !item.completed }))} deleteTask={(id) => setTasks((current) => current.filter((item) => item.id !== id))} editTask={(id, name) => updateTask(id, (item) => ({ ...item, name }))} />)}</ul></main>;
}
