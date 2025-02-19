import React, { FormEvent, useRef, useReducer } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { Todo } from "../model";

type Props = {
  todo: Todo;
  todoList: Todo[];

  dispatch: React.Dispatch<{
    type: string;
    payload: Todo;
  }>;
};

const TodoItem = ({ todo, todoList, dispatch }: Props) => {
  const [editMode, setEditMode] = React.useState(false);
  const [editedContent, setEditedContent] = React.useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [editMode]);

  function handleCompleteTask(id: string) {
    dispatch({ type: "complete_todo", payload: todo });
  }
  function handleDeleteTask(id: string) {
    dispatch({ type: "delete_todo", payload: todo });
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
    dispatch({ type: "edit_todo", payload: { ...todo, task: editedContent } });

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
