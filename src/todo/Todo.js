import React, { useState } from "react";
import { nanoid } from "nanoid";
import Form from './Form';

const TodoList = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");

    const handleChange = (e) => {
        setNewName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setIsEditing(false);
    }

    const editingTemplate = (
    <form className="stack-small">
        <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
            {props.name}'s new name
        </label>
        <input id={props.id} className="todo-text" type="text" value={newName} onChange={handleChange}/>
        </div>
        <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setIsEditing(false)}>
            cancle
            <span className="visually-hidden">{props.name} Change name</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit" onClick={handleSubmit}>
            save
            <span className="visually-hidden">{props.name}'s new name</span>
        </button>
        </div>
    </form>
    );

    const viewTemplate = (
    <div className="stack-small">
        <div className="c-cb">
        <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
            {props.name}
        </label>
        </div>
        <div className="btn-group">
        <button type="button" className="btn" onClick={()=>setIsEditing(true)}>
            Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}>
            Delete <span className="visually-hidden">{props.name}</span>
        </button>
        </div>
    </div>
    );

    return(
        <li className="todo">{isEditing?editingTemplate:viewTemplate}</li>
    )
};

const BTN = [
    { task: "all"},
    { task: "Active"},
    { task: "Completed"}
];

const FilterButton = (props) => {
  return (
    <button type="button" className="btn toggle-btn" aria-pressed="true">
      <span className="visually-hidden">Show </span>
      <span>{props.task} </span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
};

const buttonList = BTN.map((button) => (
    <FilterButton 
        task={button.task}
    />
));

const Todo = () => {
    const [tasks, setTasks] = useState([]);

    const toggleTaskCompleted = (id) => {
        const updatedTasks = tasks.map((task) => {
            if(id===task.id){
                return { ...task, completed: !task.completed};
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const editTask = (id, newName) => {
        const updatedTasks = tasks.map((task) => {
            if(id===task.id){
                return { ...task, name: newName};
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const deleteTask = (id) => {
        const deletedTasks = tasks.filter((task) => id !== task.id);
        setTasks(deletedTasks);
    };

    const taskList = tasks.map((task) => (
        <TodoList id={task.id} name={task.name} completed={task.completed} key={task.id} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask} editTask={editTask}/>
    ));

    const addTask = (name) => {
        const newTask = { id: `todo-${nanoid()}`, name, completed: false };
        setTasks([...tasks, newTask]);
    };

return (
    <div className="todoapp">
        <h1>오늘 해야 하는 일</h1>
        <Form addTask={addTask}/>
        <div className="filters btn-group stack-exception">
            {buttonList}
        </div>
        <h2 id="list-heading">{taskList.length>0?taskList.length:"No"} tasks remaining</h2>
        <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading">
            {taskList}
        </ul>
    </div>
);
};

export default Todo;