import React from "react";
import { Droppable } from "react-beautiful-dnd";

const CompletedTodos = () => {
  return (
    <Droppable droppableId={"completedTodos"}>
      {(provider) => (
        <div
          {...provider.droppableProps}
          ref={provider.innerRef}
          className="w-9/10 m-auto bg-green-500 rounded-sm p-2 my-2"
        >
          <h2 className="text-white text-xl font-bold">Finished Tasks</h2>

          <p>empty</p>
          {provider.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default CompletedTodos;
