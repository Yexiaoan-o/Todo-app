import React  from "react";
import {CheckOutlined} from '@ant-design/icons'

const Todo = ({text, id, delTodo, completeStatus, checkTodo}) => {


  return (
    <div  className={completeStatus ? 'todo completed' : 'todo'}>
      <div id={id} className="circle" onClick={() => checkTodo(id)}>
        <CheckOutlined className="check" />
      </div>
      <p  >{text}</p>

      <button id={id} onClick={delTodo} className="close">
        ×
      </button>
    </div>
  );
}

export default Todo
