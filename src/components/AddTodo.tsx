import React, { useState, ChangeEvent } from "react";
import TodoDataService from "../services/TodoService";
import ITodoData from '../types/Todo';

const AddTodo: React.FC = () => {
  const initialTodoState = {
    id: null,
    name: "",
    color: "",
    published: false
  };
  const [Todo, setTodo] = useState<ITodoData>(initialTodoState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({ ...Todo, [name]: value });
  };

  const saveTodo = () => {
    var data = {
      name: Todo.name,
      color: Todo.color
    };

    TodoDataService.create(data)
      .then((response: any) => {
        setTodo({
          id: response.data.id,
          name: response.data.name,
          color: response.data.color,

        });
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
      }, 1000);
      })
      .catch((e: Error) => {
        console.log(e);
      });

     
  };

  const newTodo = () => {
    setTodo(initialTodoState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Adiconado com sucesso!</h4>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={Todo.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="color">color</label>
            <input
              type="text"
              className="form-control"
              id="color"
              required
              value={Todo.color}
              onChange={handleInputChange}
              name="color"
            />
          </div>

          <button onClick={saveTodo} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTodo;
