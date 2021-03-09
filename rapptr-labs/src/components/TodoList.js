import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Todo from './Todo';

// validation
import * as yup from 'yup';
import schema from '../validation/NewTodoSchema';

// styling and icons
import '../styling/TodoList.css'
import searchIcon from '../images/search_icon.png'

// styled components
const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3%;
    border: 3px solid black;
    border-radius: 10px;
    width: 80%;
    
`;

const StyledInputContainer = styled.div`
    padding: 8%;
    display: flex;
    justify-content: space-around;
    border-bottom: 3px solid black;
`;
const StyledDivHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;
const StyledInput = styled.input`
    height: 6vh;
    width: 70%;
    border-radius: 30px;
    font-size: 1.15rem;
`;
const StyledSearchBtn = styled.button`
    border-radius: 30px;
    margin-left: 5%;
`;
const StyledError = styled.div`
    color: red;
    font-size: 0.7rem;
`;
const StyledButton = styled.button`
    border: 2px solid #1890ff;
    color: white;
    background: #1890ff;
    margin: 2% 2% 0 0;
`;
const StyledAddTodoDiv = styled.div`
    flex: display;
    justify-content: space-between;
`;

const initialValues = {
    newtodo: ''
}

const initialFormErrors = {
    newtodo: ''
}

const TodoList = () => {
    const { push } = useHistory();
    const [searchInput, setSearchInput] = useState('')
    const [todos, setTodos] = useState(() => {
        return localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')): []
    })
    const [newTodo, setNewTodo] = useState(initialValues)
    const [errors, setErrors] = useState(initialFormErrors);
    const [addTodo, setAddTodo] = useState(false)
    const [disabled, setDisabled] = useState(true);

    const setFormErrors = (name, value) => {
        yup
          .reach(schema, name)
          .validate(value)
          .then(() => setErrors({ ...errors, [name]: '' }))
          .catch(err => setErrors({ ...errors, [name]: err.errors[0] }));
      };

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todos))
        schema.isValid(newTodo).then(valid => setDisabled(!valid));
    }, [todos, newTodo])


    const submitNewTodo = e => {
        e.preventDefault()
        const incomingTodo = {
            id: Math.floor(Math.random()*100000),
            text: newTodo
        }
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
        setNewTodo({...newTodo, [e.target.name]: value})
      };

    const onChangeSearch = (e) => {
        setSearchInput(e.target.value)
      };

      const logoutHandler = e => {
          push('/')
      }

    const filteredList = todos.filter((item) => {
        return item.text.newtodo.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
    })

    return (
        <StyledContainer>
            <StyledDivHeader>
                <StyledButton onClick={logoutHandler}>Logout</StyledButton>
            </StyledDivHeader> 
            <h1>My To-Do List</h1>
            <StyledDiv>
                <StyledInputContainer>
                    <label>
                    <div className='input-container'>
                        <img className='icons' alt='magnifying glass icon' src={searchIcon}/>
                        <StyledInput 
                            value={searchInput}
                            onChange={onChangeSearch}
                            name="searchinput"
                            type="text"
                            placeholder="search"
                        />
                    </div>
                    </label>
                    <StyledSearchBtn onClick={showAddTodo}>New</StyledSearchBtn>
                </StyledInputContainer>
                {addTodo && 
                <StyledAddTodoDiv>
                <form onSubmit={submitNewTodo}>
                    <label>
                    <input 
                        value={newTodo.newtodo}
                        onChange={onChangeNewTodo}
                        name="newtodo"
                        type="text"
                        placeholder="new todo"
                    />
                    <div style={{ color: 'red' }}>
                        {errors.newTodo ? `${errors.newtodo}` : ''}
                    </div>
                    </label>
                    <button disabled={disabled}>Save</button>
                    <StyledError>
                        {errors.newtodo ? `${errors.newtodo}` : ''}
                    </StyledError>
                </form>
                </StyledAddTodoDiv>}
                {filteredList.map(todo => {
                    return (
                        <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
                    )
                })}
            </StyledDiv>
        </StyledContainer>
    )
}

export default TodoList