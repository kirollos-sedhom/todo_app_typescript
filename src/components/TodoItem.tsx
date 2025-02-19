import React, { FormEvent, useRef, useReducer } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { Todo } from "../model";

type Props = {
  todo: Todo;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem = ({ todo, todoList, setTodoList }: Props) => {
  const [state, dispatch] = useReducer(reducer, todoList);
  const [editMode, setEditMode] = React.useState(false);
  const [editedContent, setEditedContent] = React.useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  function reducer(action: string) {
    switch (action) {
      case "delete_todo":
        let newTodoList = todoList.filter((item) => item.id !== todo.id);
        return newTodoList;
      // setTodoList(newTodoList);
      default:
        return;
    }
  }
  React.useEffect(() => {
    console.log("current input:", inputRef.current);
    inputRef.current?.focus();
  }, [editMode]);

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
  function handleEditTask() {
    setEditMode((mode) => !mode);
    setEditedContent(todo.task);
  }

  function handleChange() {
    if (inputRef.current) setEditedContent(inputRef.current.value);
  }

  function handleFinishedEditing(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTodoList = todoList.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item,
          task: editedContent,
        };
      }
      return item;
    });
    setTodoList(newTodoList);
    setEditMode((mode) => !mode);
  }
  return (
    <div className="select-none bg-linear-to-r from-yellow-100 to-white  my-2 p-2 rounded-md flex items-center justify-between">
      {editMode ? (
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => handleFinishedEditing(e)}
        >
          <input
            type="text"
            ref={inputRef}
            value={editedContent}
            onChange={handleChange}
          />
        </form>
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
        <FaEdit className="cursor-pointer" onClick={() => handleEditTask()} />
        <FaCheck
          className="cursor-pointer"
          onClick={() => handleCompleteTask(todo.id)}
        />
      </div>
    </div>
  );
};

export default TodoItem;
