import React, { useRef } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
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
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

export default App;
