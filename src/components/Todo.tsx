import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import TodoDataService from "../services/TodoService";
import ITodoData from "../types/Todo";

const Todo: React.FC = () => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialTodoState = {
    id: null,
    name: "",
    color: "",
    favorite: false 
  };
  const [currentTodo, setCurrentTodo] = useState<ITodoData>(initialTodoState);
  const [message, setMessage] = useState<string>("");

  const getTodo = (id: string) => {
    TodoDataService.get(id)
      .then((response: any) => {
        setCurrentTodo(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getTodo(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const updatefavorite = (status: boolean) => {
    var data = {
      id: currentTodo.id,
      name: currentTodo.name,
      color: currentTodo.color,
      favorite: status
    };

    TodoDataService.update(currentTodo.id, data)
      .then((response: any) => {
        console.log(response.data);
        setCurrentTodo({ ...currentTodo, favorite: status });
        setMessage("O status foi alterado com sucesso!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateTodo = () => {
    TodoDataService.update(currentTodo.id, currentTodo)
      .then((response: any) => {
        console.log(response.data);
        setMessage("as informações foram alterado com sucesso!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteTodo = () => {
    TodoDataService.remove(currentTodo.id)
      .then((response: any) => {
        console.log(response.data);
        navigate("/Todos");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTodo ? (
        <div className="edit-form">
          <h4>Todo</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentTodo.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="color">color</label>
              <input
                type="text"
                className="form-control"
                id="color"
                name="color"
                value={currentTodo.color}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTodo.favorite ? "favorito" : "Não favorito"}
            </div>
          </form>

          {currentTodo.favorite ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatefavorite(false)}
            >
              Desfavoritar
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatefavorite(true)}
            >
              Favoritar
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteTodo}>
            Deletar
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTodo}
          >
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Por favor clica em um fazer...</p>
        </div>
      )}
    </div>
  );
};

export default Todo;
