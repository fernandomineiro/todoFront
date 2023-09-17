import http from "../http-common";
import ITodoData from "../types/Todo";

const getAll = () => {
  return http.get<Array<ITodoData>>("");
};

const get = (id: any) => {
  return http.get<ITodoData>(`${id}`);
};

const create = (data: ITodoData) => {
  console.log(data)
  return http.post<ITodoData>("", data);
};

const update = (id: any, data: ITodoData) => {
  return http.put<any>(`${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`${id}`);
};

const removeAll = () => {
  return http.delete<any>(``);
};

const findByTitle = (title: string) => {
  return http.get<Array<ITodoData>>(`/Todos?title=${title}`);
};

const TodoService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TodoService;
