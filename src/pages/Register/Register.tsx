import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import accountApi from '../../api/accountApi';
import { AuthContext } from '../../App';
import Button from '../../components/UI/Button/Button';
import "./Register.css";


const Register = () => {
  const [isLogged, login, logout] = useContext(AuthContext);
  const [loginInput, setLoginInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const registerHandler = async () => {
    const registerRes = await accountApi.register({
      login: loginInput,
      password: passwordInput,
      confirmPassword: confirmPasswordInput,
    });

    if (!registerRes) {
      setError("login or password incorrect");
    }

    const loginRes = await accountApi.register({
      login: loginInput,
      password: passwordInput,
      confirmPassword: confirmPasswordInput,
    });

    if (loginRes) {
      login(loginRes.token);
    }
  };

  const loginHandler = () => {
    navigate("/login");
  };


  return (
    <div className='login'>
      <div>
        {error}
      </div>

      <div className='inputs'>
        <input type="text" placeholder='login' onChange={(e) => setLoginInput(e.target.value)} value={loginInput} />
        <input type="text" placeholder='password' onChange={(e) => setPasswordInput(e.target.value)} value={passwordInput} />
        <input type="text" placeholder='confirm password' onChange={(e) => setConfirmPasswordInput(e.target.value)} value={confirmPasswordInput} />
      </div>

      <div className='buttons'>

        <div>
          <Button onClick={registerHandler}>Register</Button>
        </div>

        <div>
          <Button onClick={loginHandler}>Login</Button>
        </div>
      </div>

    </div>
  )
}

export default Register;