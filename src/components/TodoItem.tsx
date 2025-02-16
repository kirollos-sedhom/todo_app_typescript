import React from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { Todo } from "../model";
type Props = {
  todo: Todo;
};
const TodoItem = ({ todo }: Props) => {
  return (
    <div className="bg-linear-to-r from-yellow-100 to-white  my-2 p-2 rounded-md flex items-center justify-between">
      <p>{todo.task}</p>
      <div className="flex gap-2">
        <FaTrash className="cursor-pointer" />
        <FaEdit className="cursor-pointer" />
        <FaCheck className="cursor-pointer" />
      </div>
    </div>
  );
};

export default TodoItem;
