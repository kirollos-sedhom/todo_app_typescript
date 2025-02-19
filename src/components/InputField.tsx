import React, { useRef } from "react";
import { Todo } from "../model";

type Props = {
  todoItem: string;
  setTodoItem: React.Dispatch<React.SetStateAction<string>>;
  todoList: Todo[];

  handleAdd: (e: React.FormEvent) => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
};
const InputField = ({
  todoItem,
  setTodoItem,
  todoList,

  handleAdd,
  inputRef,
}: Props) => {
  return (
    <form
      onSubmit={(e) => handleAdd(e)}
      className="w-9/10 mx-auto relative flex justify-center items-center"
    >
      <input
        ref={inputRef}
        value={todoItem}
        onChange={(e) => setTodoItem(e.target.value)}
        className="w-full bg-white rounded-4xl p-2 placeholder-gray-900 focus:shadow-[0_0_10px_1000px_rgba(0,0,0,0.5)] "
        type="input"
        placeholder="what would you like to do?"
      />
      <button
        type="submit"
        className="absolute right-2 bg-blue-700 text-white rounded-4xl p-1 cursor-pointer shadow-[0_0_10px_black] "
      >
        GO
      </button>
    </form>
  );
};

export default InputField;
