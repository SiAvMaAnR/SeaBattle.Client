import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import accountApi from '../../api/accountApi';
import { AuthContext } from "../../App";
import Button from '../../components/UI/Button/Button';
import "./Login.css";


const Login = () => {
    const [isLogged, login, logout] = useContext(AuthContext);
    const [loginInput, setLoginInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const loginHandler = async () => {
        const response = await accountApi.login({
            login: loginInput,
            password: passwordInput,
        });

        if (response) {
            login(response.token);
        } else {
            setError("login or password incorrect");
        }
    };

    const registerHandler = () => {
        navigate("/register");
    };


    return (
        <div className='login'>
            <div>
                {error}
            </div>

            <div className='inputs'>
                <input type="text" placeholder='login' onChange={(e) => setLoginInput(e.target.value)} value={loginInput} />
                <input type="text" placeholder='password' onChange={(e) => setPasswordInput(e.target.value)} value={passwordInput} />
            </div>

            <div>
                <Button onClick={loginHandler}>Login</Button>
            </div>
        </div>
    )
}

export default Login;