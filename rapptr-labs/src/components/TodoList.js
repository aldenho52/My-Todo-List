import React, {useEffect, useState} from 'react'

// styling and icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const TodoList = () => {
    const [searchInput, setSearchInput] = useState('')
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const [editTodoInput, setEditTodoInput] = useState({})
    const [addTodo, setAddTodo] = useState(false)

    useEffect(() => {
        
    }, [todos])

    const deleteTodo = textValue => {
        console.log(textValue)
        const index = todos.findIndex(todo => {
            return todo.text === textValue
        })
        console.log(index)
        const updatedList = todos.filter(todo => {
            return todo.text !== textValue
        })
        setTodos(updatedList)
    }

    const submitNewTodo = e => {
        e.preventDefault()
        const incomingTodo = {
            id: Math.floor(Math.random()*100000),
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
        setNewTodo(e.target.value)
      };

    const onChangeSearch = (e) => {
        setSearchInput(e.target.value)
      };

    const filteredList = todos.filter((item) => {
        return item.text.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
    })

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
                        {filteredList.map(todo => {
                            return (
                                <div>
                                    <p>{todo.text}</p>
                                    <div>
                                    <EditIcon onClick={() => setEditTodoInput(todo.text)}></EditIcon>
                                    <DeleteIcon onClick={() => deleteTodo(todo.text)}></DeleteIcon>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoList