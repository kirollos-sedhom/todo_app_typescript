import React from "react";
import { Todo } from "../model";
import TodoItem from "./TodoItem";

type Props = {
  todoList: Todo[];
  dispatch: React.Dispatch<{
    type: string;
    payload: Todo;
  }>;
};

const TodoList = ({ todoList, dispatch }: Props) => {
  return (
    <div className="w-9/10 m-auto bg-blue-400 rounded-sm p-2 my-2">
      <h2 className="text-white text-xl">Active Tasks</h2>

      {todoList.map((item) => (
        <TodoItem
          todo={item}
          todoList={todoList}
          dispatch={dispatch}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default TodoList;
