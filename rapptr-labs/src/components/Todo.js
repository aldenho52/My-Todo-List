import React, {useState, useEffect} from 'react'

// validation
import * as yup from 'yup';
import schema from '../validation/TodoSchema.js';

// icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const initialFormErrors = {
    edittodo: ''
}
const initialValues = {
    edittodo: ''
}

const Todo = props => {
    const {todo, todos, setTodos} = props
    const [editing, setEditing] = useState(false)
    const [editInput, setEditInput] = useState(initialValues)
    const [errors, setErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        schema.isValid(editInput).then(valid => setDisabled(!valid));
      }, [editInput]);


    const setFormErrors = (name, value) => {
        yup
          .reach(schema, name)
          .validate(value)
          .then(() => setErrors({ ...errors, [name]: '' }))
          .catch(err => setErrors({ ...errors, [name]: err.errors[0] }));
      };

      const onChangeNewTodo = (e) => {
        const { name, value } = e.target;
        setFormErrors(name, value); 
        setEditInput({...editInput, [e.target.name]: value})
      };


    const editTodo = textValue => {
        console.log(textValue)
        setEditInput({...editInput, edittodo: textValue})
        setEditing(true)
    }

    const saveEdits = e => {
        e.preventDefault()
        let updatedTodo = todo
        updatedTodo.text.newtodo = editInput.edittodo
        let updatedTodoList = [...todos]
        let index = updatedTodoList.findIndex(
            el => el.id === todo.id
        )
        updatedTodoList.splice(index, 1, updatedTodo)
        setEditing(false)
    }

    const deleteTodo = textValue => {
        console.log(textValue)
        const index = todos.findIndex(todo => {
            return todo.text.newtodo === textValue
        })
        console.log(index)
        const updatedList = todos.filter(todo => {
            return todo.text.newtodo !== textValue
        })
        setTodos(updatedList)
    }


    return (
        <div>
        {editing ? 
            <div>
                <form onSubmit={saveEdits}>
                    <label>
                    <input 
                        value={editInput.edittodo}
                        onChange={onChangeNewTodo}
                        name="edittodo"
                        type="text"
                        placeholder="new todo"
                    />
                    </label>
                    <button disabled={disabled}>Save</button>
                </form>
            </div>
        :
        <div>
            <p>{todo.text.newtodo}</p>
            <div>
            <EditIcon onClick={() => editTodo(todo.text.newtodo)}></EditIcon>
            <DeleteIcon onClick={() => deleteTodo(todo.text.newtodo)}></DeleteIcon>
            </div>
        </div>}
        </div>
    )
}


export default Todo