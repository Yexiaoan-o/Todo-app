import React, {useState} from "react";
import { CheckOutlined } from "@ant-design/icons";

const Todo = ({
  text,
  id,
  delTodo,
  isComplete,
  isEditing,
  checkTodo,
  handleToggleEdit,
  handleEditTodo,
  handleKeyDown
}) => {
  const [editedText, setEditedText] = useState(text)
  return (
    <div className={isComplete ? "todo completed" : "todo"}>
      <div id={id} className="circle" onClick={() => checkTodo(id)}>
        <CheckOutlined className="check" />
      </div>
      {isEditing ? (
        <textarea
        id={id}
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, id, editedText)}
        onBlur={() => handleEditTodo(id, editedText)}
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
