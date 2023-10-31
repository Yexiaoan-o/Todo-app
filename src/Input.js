import React, { useState, useEffect } from "react";
import Todo from "./Todo";

export default function Input() {
  const localTodos = JSON.parse(localStorage.getItem("todos")); // Read and parse the todo object array stored locally
  const [todos, setTodos] = useState(localTodos || []); // Declare the todo object array as a state, and initialize the state to locally stored array
  const [todoElements, setTodoElements] = useState([]); // Declare the todo element array as a state, and initialize the state to an empty array
  const [text, setText] = useState(""); // Declare the todo text as a state, and initialize the state to an empty string

  useEffect(() => {
    // Set the todo element array when the page is first rendered, and re-render the page once the todo object array changes
    setTodoElements(convertArray(todos));
  }, [todos]);

  // The function converts a todo object array to a todo element array
  function convertArray(array) {
    const Elements = array.map((todo, index) => {
      return (
        <Todo
          key={index}
          text={todo.text}
          completeStatus={todo.isComplete}
          id={index}
          delTodo={delTodo}
          checkTodo={checkTodo}
        />
      );
    });
    return Elements;
  }

  // The function monitors the input box, and set the todo text upon the value change of the input box
  function handleInputChange(e) {
    setText(e.target.value);
  }

  // The function writes the todo text and todo status into the todo objecy array upon a press on the Enter key
  function getText(e) {
    if (e.key === "Enter" && text.trim() !== "") {
      setTodos((prev) => {
        let newTodos = [...prev];
        newTodos = [...newTodos, { text: text, isComplete: false }];
        localStorage.setItem("todos", JSON.stringify(newTodos)); // Update the local storage
        return newTodos;
      });
      setText(""); // Reset the input box
    }
  }

  // The functions check a todo upon a click on the todo
  function checkTodo(index) {
    setTodos((prev) => {
      const newTodos = [...prev];
      newTodos[index] = {
        ...newTodos[index],
        isComplete: !newTodos[index].isComplete,
      };
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  }

  // The function checks all unchecked todos or unchecks all checked todos upon a click on a specific element
  function checkall() {
    setTodos((prev) => {
      // Check if there's at least one unchecked todo
      const hasUnchecked = prev.some((todo) => !todo.isComplete);

      // If there's at least one unchecked todo, check them all,
      // otherwise uncheck all of them.
      const newTodos = prev.map((todo) => ({
        ...todo,
        isComplete: hasUnchecked,
      }));
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  }

  // The function deletes a todo upon a click on the delete button
  function delTodo(e) {
    const targetIndex = parseInt(e.target.id, 10);
    setTodos((prev) => {
      const newTodos = prev.filter((_, index) => index !== targetIndex);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  }

  // The function deletes all checked todos upon a click on the clearall button
  function delChecked() {
    setTodos((prev) => {
      const newTodos = prev.filter((todo) => todo.isComplete === false);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  }

  // The function filters todos by active (unchecked), checked, and all
  function filterElements(e) {
    if (e.target.id === "active") {
      setTodoElements(convertArray(uncheckedTodos));
    } else if (e.target.id === "checked") {
      setTodoElements(convertArray(checkedTodos));
    } else {
      setTodoElements(convertArray(todos));
    }
  }

  // Filter checked and unchecked todos for the display of filtered todos
  const checkedTodos = todos.filter((todo) => todo.isComplete === true);
  const uncheckedTodos = todos.filter((todo) => todo.isComplete === false);

  return (
    <div className="container">
      {todos.length > 0 && <div onClick={checkall} className="checkall"></div>}
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleInputChange}
        onKeyUp={getText}
      ></input>
      <div className="todo-container">
        {todoElements}
        {todos.length > 0 && (
          <div className="todo-footer">
            <span className="item-left">
              {uncheckedTodos.length}{" "}
              {uncheckedTodos.length > 1 ? "items" : "item"} left
            </span>
            <span id="all" onClick={filterElements} className="all">
              All
            </span>
            <span id="active" onClick={filterElements} className="active">
              Active
            </span>
            <span id="checked" onClick={filterElements} className="checked">
              Completed
            </span>
            {checkedTodos.length > 0 && (
              <span onClick={delChecked} className="clear">
                Clear Completed
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
