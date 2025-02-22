import React from "react";
import { Todo } from "../model";
import TodoItem from "./TodoItem";
import { Droppable } from "react-beautiful-dnd";

type Props = {
  todoList: Todo[];
  dispatch: React.Dispatch<{
    type: string;
    payload: Todo;
  }>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoList = ({
  todoList,
  dispatch,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  React.useEffect(() => {
    console.log("TodoList mounted with droppableId: todoList");
  }, []);
  console.log("TodoList is rendering...");
  return (
    <div className="w-9/10  m-auto">
      <Droppable droppableId="todoList" key="todoList">
        {(provided, snapshot) => {
          console.log("Rendering Droppable for todoList"); // ✅ Debug log
          console.log(
            `Droppable rendering with id: ${provided.droppableProps["data-rbd-droppable-id"]}`
          );

          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className=" bg-blue-400 rounded-sm p-2 my-2"
            >
              <h2 className="text-white text-xl font-bold">Active Tasks</h2>

              {todoList.map((item, index) => (
                <TodoItem
                  todo={item}
                  todoList={todoList}
                  dispatch={dispatch}
                  key={item.id}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      {/* <Droppable droppableId="TodosRemove" key="TodosRemove">
        {(provider, snapshot) => (
          <div
            {...provider.droppableProps}
            ref={provider.innerRef}
            className="w-9/10 m-auto bg-green-500 rounded-sm p-2 my-2"
          >
            <h2 className="text-white text-xl font-bold">Finished Tasks</h2>
            {completedTodos.map((item, index) => (
              <TodoItem
                todo={item}
                todoList={completedTodos}
                dispatch={dispatch}
                key={item.id}
                index={index}
              />
            ))}
            {provider.placeholder}
          </div>
        )}
      </Droppable> */}
    </div>
  );
};

export default TodoList;
