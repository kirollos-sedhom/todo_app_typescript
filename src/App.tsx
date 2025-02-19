import React, { useRef } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import TodoItem from "./components/TodoItem";
function reducer(state: Todo[], action: { type: string; payload: Todo }) {
  switch (action.type) {
    case "add_todo":
      return [...state, action.payload];
    case "delete_todo":
      return state.filter((item: Todo) => item.id !== action.payload.id);

    case "complete_todo":
      return state.map((item: Todo) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            isDone: !item.isDone,
          };
        } else {
          return item;
        }
      });

    case "edit_todo":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            task: action.payload.task,
          };
        } else {
          return item;
        }
      });

    default:
      return state;
  }
}

function App() {
  const [todoItem, setTodoItem] = React.useState<string>("");

  const [todoList, dispatch] = React.useReducer(reducer, []);

  const inputRef = useRef<HTMLInputElement | null>(null);
  function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    if (todoItem) {
      const newItem: Todo = {
        id: Date.now().toString(),
        task: todoItem,
        isDone: false,
      };
      dispatch({ type: "add_todo", payload: newItem });
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
        handleAdd={handleAdd}
        inputRef={inputRef}
      />
      <TodoList todoList={todoList} dispatch={dispatch} />
    </div>
  );
}

export default App;
