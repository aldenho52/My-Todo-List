import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';

// validation
import * as yup from 'yup';
import schema from '../validation/NewTodoSchema';

// styling and icons

import Todo from './Todo';

const initialFormErrors = {
    newtodo: ''
}

const TodoList = () => {
    const { push } = useHistory();
    const [searchInput, setSearchInput] = useState('')
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todoList')))
    const [newTodo, setNewTodo] = useState('')
    const [errors, setErrors] = useState(initialFormErrors);
    const [addTodo, setAddTodo] = useState(false)

    const setFormErrors = (name, value) => {
        yup
          .reach(schema, name)
          .validate(value)
          .then(() => setErrors({ ...errors, [name]: '' }))
          .catch(err => setErrors({ ...errors, [name]: err.errors[0] }));
      };

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todos))
    }, [todos])


    const submitNewTodo = e => {
        e.preventDefault()
        const incomingTodo = {
            id: Math.floor(Math.random()*100000),
            editing: false,
            text: newTodo
        }
        console.log(incomingTodo)
        if (todos.length === 0) {
            setTodos([incomingTodo])
        } else(
            setTodos([...todos, incomingTodo])
        )
        setAddTodo(false)
        setNewTodo('')
    }
    const showAddTodo = () => {
        setAddTodo(true)
    }

    const onChangeNewTodo = (e) => {
        const { name, value } = e.target;
        setFormErrors(name, value); 
        setNewTodo(e.target.value)
      };

    const onChangeSearch = (e) => {
        setSearchInput(e.target.value)
      };

      const logoutHandler = e => {
          push('/')
      }

    const filteredList = todos.filter((item) => {
        return item.text.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
    })

    return (
        <div>
            <header>
                <button onClick={logoutHandler}>Logout</button>
            </header>
            <div>
                <h1>My To-Do List</h1>
                <div>
                    <div>
                        <label>
                            <input 
                                value={searchInput}
                                onChange={onChangeSearch}
                                name="searchinput"
                                type="text"
                                placeholder="search"
                            />
                        </label>
                        <button onClick={showAddTodo}>New</button>
                    </div>
                    {addTodo && 
                        <div>
                        <form onSubmit={submitNewTodo}>
                            <label>
                            <input 
                                value={newTodo}
                                onChange={onChangeNewTodo}
                                name="newtodo"
                                type="text"
                                placeholder="new todo"
                            />
                            </label>
                            <button>Save</button>
                            <div style={{ color: 'red' }}>
                                {errors.newtodo ? `${errors.newtodo}` : ''}
                            </div>
                        </form>
                        </div>}
                    <div>
                        {filteredList.map(todo => {
                            return (
                                <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoList