import React, {useEffect, useState} from 'react'

const TodoList = () => {
    const [searchInput, setSearchInput] = useState('')
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const [editTodo, setEditTodo] = useState({})
    const [addTodo, setAddTodo] = useState(false)

    useEffect(() => {
        
    }, [todos])

    const submitNewTodo = e => {
        e.preventDefault()
        const incomingTodo = {
            text: newTodo
        }
        console.log(incomingTodo)
        if (todos.length === 0) {
            setTodos(incomingTodo)
        } else(
            setTodos(...todos, incomingTodo)
        )
        setAddTodo(false)
        setNewTodo('')
    }
    const showAddTodo = () => {
        setAddTodo(true)
    }

    const onChangeNewTodo = (e) => {
        setNewTodo(e.target.value)
      };

    const onChangeSearch = (e) => {
        setSearchInput(e.target.value)
      };

    return (
        <div>
            <header>
                <button>Logout</button>
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
                        </form>
                        </div>}
                    <div>
                        {todos.map(todo => {
                            return (
                                <div>{todo.text}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoList