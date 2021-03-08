import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// validation
import * as yup from 'yup';
import schema from '../validation/LoginFormSchema';

// styling
import '../styling/LoginPage.css'
import accountIcon from '../images/account_icon.png'
import passwordLockIcon from '../images/password_lock.png'


const initialValues = {
    email: '',
    password: ''
}

const initialFormErrors = {
    email: '',
    password: ''
}


const LoginPage = () => {
    const { push } = useHistory();
    const [loginInfo, setLoginInfo] = useState(initialValues)
    const [errors, setErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(true);

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
        <div>
            <h1>Rapptr Labs</h1>
            <form onSubmit={onSubmit}>
                <label>
                Email
                <div className='input-container'>
                <img className='icons' alt='account icon' src={accountIcon}/>
                <input
                    value={loginInfo.email}
                    onChange={onChange}
                    name="email"
                    type="email"
                    placeholder="user@rapptrlabs.com"
                />
                </div>
                <div style={{ color: 'red' }}>
                {errors.email ? `${errors.email}` : ''}
              </div>
                </label>
                <label>
                Password
                <div className='input-container'>
                    <img className='icons' alt='account icon' src={passwordLockIcon}/>
                    <input
                        value={loginInfo.password}
                        onChange={onChange}
                        name="password"
                        type="password"
                        placeholder='Must be at least 4 characters'
                    />
                </div>
                <div style={{ color: 'red' }}>
                {errors.password ? `${errors.password}` : ''}
              </div>
                </label>
                <button disabled={disabled}>Login</button>
            </form>
        </div>
    )
};

export default LoginPage;
