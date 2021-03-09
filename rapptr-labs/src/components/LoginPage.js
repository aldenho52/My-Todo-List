import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// validation
import * as yup from 'yup';
import schema from '../validation/LoginFormSchema';

// styling
import '../styling/LoginPage.css'
import accountIcon from '../images/account_icon.png'
import passwordLockIcon from '../images/password_lock.png'

// styled components
const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
`;

const StyledInputContainer = styled.div`
    margin-bottom: 10%;
`;
const StyledInput = styled.input`
    margin-top: 1%;
    height: 6vh;
`;
const StyledError = styled.div`
    color: red;
    font-size: 0.7rem;
`;
const StyledButton = styled.button`
    width: 100%;
    border: 2px solid #1890ff;
    color: white;
    background: #1890ff;
    height: 5vh;
`;

const initialValues = {
    user_email: '',
    user_password: ''
}

const initialFormErrors = {
    user_email: '',
    user_password: ''
}


const LoginPage = () => {
    const { push } = useHistory();
    const [loginInfo, setLoginInfo] = useState(initialValues)
    const [errors, setErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(true);

    // form validation 
    const setFormErrors = (name, value) => {
        yup
          .reach(schema, name)
          .validate(value)
          .then(() => setErrors({ ...errors, [name]: '' }))
          .catch(err => setErrors({ ...errors, [name]: err.errors[0] }));
      };

      useEffect(() => {
        schema.isValid(loginInfo).then((valid) => {
          setDisabled(!valid);
        });
      }, [loginInfo]);

    // login submit action
    const onSubmit = e => {
        e.preventDefault()
        axios.post('http://dev.rapptrlabs.com/Tests/scripts/user-login.php', loginInfo)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            console.log(loginInfo)
        })
        push('/todolist')
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormErrors(name, value);        
        setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
      };

    return (
        <StyledDiv>
            <h1>Rapptr Labs</h1>
            <form onSubmit={onSubmit}>
                <StyledInputContainer>
                    <label>
                    Email
                    <div className='input-container-login'>
                    <img className='icons' alt='account icon' src={accountIcon}/>
                    <StyledInput
                        value={loginInfo.user_email}
                        onChange={onChange}
                        name="user_email"
                        type="email"
                        placeholder="user@rapptrlabs.com"
                        className={errors.user_email ? 'invalid' : ''}
                    />
                    </div>
                    <StyledError>
                        {errors.user_email ? `${errors.user_email}` : ''}
                    </StyledError>
                    </label>
                </StyledInputContainer>
                <StyledInputContainer>
                    <label>
                    Password
                    <div className='input-container-login'>
                        <img className='icons' alt='account icon' src={passwordLockIcon}/>
                        <StyledInput
                            value={loginInfo.user_password}
                            onChange={onChange}
                            name="user_password"
                            type="password"
                            placeholder='Must be at least 4 characters'
                            className={errors.user_password ? 'invalid' : ''}
                        />
                    </div>
                    <StyledError>
                        {errors.user_password ? `${errors.user_password}` : ''}
                    </StyledError>
                    </label>
                </StyledInputContainer>
                <StyledButton disabled={disabled}>Login</StyledButton>
            </form>
        </StyledDiv>
    )
};

export default LoginPage;
