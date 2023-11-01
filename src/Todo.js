import React from "react";
import { CheckOutlined } from "@ant-design/icons";

const Todo = ({
  text,
  id,
  delTodo,
  isComplete,
  isEditing,
  checkTodo,
  handleToggleEdit,
  handleTextChange,
  handleEditTodo,
  handleKeyDown
}) => {
  return (
    <div className={isComplete ? "todo completed" : "todo"}>
      <div id={id} className="circle" onClick={() => checkTodo(id)}>
        <CheckOutlined className="check" />
      </div>
      {isEditing ? (
        <textarea
        id={id}
        value={text}
        onChange={(e) => handleTextChange(id, e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, id, text)}
        onBlur={() => handleEditTodo(id, text)}
        autoFocus
      />
      ) : (
        <p id={id} onDoubleClick={() => handleToggleEdit(id)}>
          {text}
        </p>
      )}

      <button id={id} onClick={delTodo} className="close">
        ×
      </button>
    </div>
  );
};

export default Todo;
