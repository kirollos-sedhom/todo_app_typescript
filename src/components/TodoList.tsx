import React from "react";
import { Todo } from "../model";
import TodoItem from "./TodoItem";

type Props = {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};
const TodoList = ({ todoList, setTodoList }: Props) => {
  return (
    <div className="w-9/10 m-auto bg-blue-400 rounded-sm p-2 my-2">
      <h2 className="text-white text-xl">Active Tasks</h2>

      {todoList.map((item) => (
        <TodoItem todo={item} key={item.id} />
      ))}
    </div>
  );
};

export default TodoList;
