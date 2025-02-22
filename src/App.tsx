import React, { act, useRef } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import TodoItem from "./components/TodoItem";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import CompletedTodos from "./components/CompletedTodos";
function reducer(state: Todo[], action: { type: string; payload: any }) {
  switch (action.type) {
    case "set_todolist":
      return action.payload;

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
  const [completedTodos, setCompletedTodos] = React.useState<Todo[]>([]);

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

  function onDragEnd(result: DropResult) {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add: Todo;
    const newActive = [...todoList];
    const newComplete = [...completedTodos];
    // Source Logic
    if (source.droppableId === "todoList") {
      add = newActive[source.index];
      newActive.splice(source.index, 1);
    } else {
      add = newComplete[source.index];
      newComplete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "todoList") {
      newActive.splice(destination.index, 0, add);
    } else {
      newComplete.splice(destination.index, 0, add);
    }

    setCompletedTodos(newComplete);
    // set regular todo list
    dispatch({ type: "set_todolist", payload: newActive });
    console.log("Drag ended. Dropped into:", destination?.droppableId);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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

        <div className="md:flex md:w-1/2 gap-4 mx-auto ">
          <TodoList
            todoList={todoList}
            dispatch={dispatch}
            completedTodos={completedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
