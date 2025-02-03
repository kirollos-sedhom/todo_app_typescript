import React from "react";

const InputField = () => {
  return (
    <form className="w-9/10 mx-auto relative flex justify-center items-center">
      <input
        className="w-full bg-white rounded-4xl p-2"
        type="input"
        placeholder="what would you like to do?"
      />
      <button
        type="submit"
        className="absolute right-2 bg-blue-400 text-white rounded-4xl p-1 cursor-pointer"
      >
        add
      </button>
    </form>
  );
};

export default InputField;
