import React from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { Todo } from "../model";

type Props = {
  todo: Todo;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem = ({ todo, todoList, setTodoList }: Props) => {
  const [editMode, setEditMode] = React.useState(false);
  const [editedContent, setEditedContent] = React.useState("");
  function handleCompleteTask(id: string) {
    let newTodoList = todoList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isDone: !item.isDone,
        };
      } else {
        return item;
      }
    });
    setTodoList(newTodoList);
  }
  function handleDeleteTask(id: string) {
    let newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  }
  function handleEditTask(id: string) {
    //!todo finish the edit functionality
    console.log("editing");
    setEditMode((mode) => !mode);
    setEditedContent(todo.task);
  }
  return (
    <div className="select-none bg-linear-to-r from-yellow-100 to-white  my-2 p-2 rounded-md flex items-center justify-between">
      {editMode ? (
        <input type="text" content="happy happy happy" />
      ) : todo.isDone ? (
        <p>
          <s>{todo.task}</s>
        </p>
      ) : (
        <p>{todo.task}</p>
      )}

      <div className="flex gap-2">
        <FaTrash
          className="cursor-pointer"
          onClick={() => handleDeleteTask(todo.id)}
        />
        <FaEdit
          className="cursor-pointer"
          onClick={() => handleEditTask(todo.id)}
        />
        <FaCheck
          className="cursor-pointer"
          onClick={() => handleCompleteTask(todo.id)}
        />
      </div>
    </div>
  );
};

export default TodoItem;
