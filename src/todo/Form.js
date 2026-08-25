import { useState } from "react";

export default function Form({ addTask }) {
  const [name, setName] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    addTask(trimmedName);
    setName("");
  }
  return <form onSubmit={handleSubmit}><h2 className="label-wrapper"><label htmlFor="new-todo-input" className="label__lg">무엇을 해야 하나요?</label></h2><input type="text" id="new-todo-input" className="input input__lg" autoComplete="off" value={name} onChange={(event) => setName(event.target.value)} /><button type="submit" className="btn btn__primary btn__lg">추가</button></form>;
}
