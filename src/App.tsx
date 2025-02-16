import React, { useRef } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
function App() {
  const [todoItem, setTodoItem] = React.useState<string>("");
  const [todoList, setTodoList] = React.useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    let newTodoItem = {
      id: Date.now().toString(),
      task: todoItem,
      isDone: false,
    };
    if (todoItem) {
      setTodoList((prev) => [newTodoItem, ...prev]);
      setTodoItem("");

      inputRef.current?.blur();
    }
  }
  console.log(todoList);
  return (
    <div className="bg-blue-700 h-screen m-0 p-p">
      <h1 className="text-center py-4 text-3xl text-white z-10 relative">
        Taskify
      </h1>
      <InputField
        todoItem={todoItem}
        setTodoItem={setTodoItem}
        todoList={todoList}
        setTodoList={setTodoList}
        handleAdd={handleAdd}
        inputRef={inputRef}
      />
      <div className="w-9/10 m-auto bg-blue-400 rounded-sm p-2 my-2">
        <h2 className="text-white text-xl">Active Tasks</h2>
        <ul>
          {todoList.map((item) => (
            <li className="bg-linear-to-r from-yellow-100 to-white  my-2 p-2 rounded-md">
              {item.task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
