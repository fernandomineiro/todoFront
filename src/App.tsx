import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import TodosList from "./components/TodoList";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/Todos" className="navbar-brand">
         Lista de tarefa
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/Todos"} className="nav-link">
              Todos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<TodosList/>} />
          <Route path="/Todos" element={<TodosList/>} />
          <Route path="/add" element={<AddTodo/>} />
          <Route path="/Todos/:id" element={<Todo/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
