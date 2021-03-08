import React, {useEffect, useState} from 'react'

const TodoList = () => {
    const [searchInput, setSearchInput] = useState('')
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const [editTodo, setEditTodo] = useState({})

    useEffect(() => {
        
    }, [])

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
                            <input />
                        </label>
                        <button>New</button>
                    </div>
                    <div>

                    </div>
                    <div>
                        {}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoList