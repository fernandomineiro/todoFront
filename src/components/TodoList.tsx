import React, { useState, useEffect, ChangeEvent } from "react";
import TodoDataService from "../services/TodoService";
import { Link } from "react-router-dom";
import ITodoData from '../types/Todo';

const TodosList: React.FC = () => {
  const [todos, setTodos] = useState<Array<ITodoData>>([]);
  const [currentTodo, setCurrentTodo] = useState<ITodoData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveTodos();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTodos = () => {
    TodoDataService.getAll()
      .then((response: any) => {
        console.log(response)
        response.data.sort(function(a:any,b:any){return b.favorite-a.favorite});

        setTodos(response.data);
        
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTodos();
    setCurrentTodo(null);
    setCurrentIndex(-1);
  };

  const setActiveTodo = (Todo: ITodoData, index: number) => {
    setCurrentTodo(Todo);
    setCurrentIndex(index);
  };

  const removeAllTodos = () => {
    TodoDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TodoDataService.findByTitle(searchTitle)
      .then((response: any) => {
        setTodos(response.data);
        setCurrentTodo(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar por nome"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Pesquisar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista</h4>

        <ul className="list-group">
            {todos &&
            todos.map((Todo, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTodo(Todo, index)}
                key={index}
              >
                {Todo.name}   {Todo.favorite == true ? "★" : null}   
              </li>
            ))} 
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTodos}
        >
          Remover todos
        </button>
      </div>
      <div className="col-md-6">
        {currentTodo ? (
          <div>
            <h4>Lista selecionada</h4>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>{" "}
              {currentTodo.name}
            </div>
            <div>
              <label>
                <strong>Color:</strong>
              </label>{" "}
              {currentTodo.color}
            </div>
            <div>
              <label>
                <strong>Favorito:</strong>
              </label>{" "}
               {currentTodo.favorite ? "Sim" : "Não"}
            </div>

            <Link
              to={"/Todos/" + currentTodo.id}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>por favor clique em um fazer...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodosList;
