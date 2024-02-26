import React, {useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {

      if(!name || !login || !password){
        return setErrorMessage('Некорректные данные')
      }
        try {
          await axios.post('http://localhost:3000/api/user/registration', { name, login, password });
          console.log('Пользователь успешно зарегистрирован');
          navigate('/login');
        } catch (error) {
          console.error('Ошибка во время регистрации:', error.response?.data?.error || 'Неожиданная ошибка');
        }
      };

  return (
    <div>
        <h1>Регистрация</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Введите имя...'/>
        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} placeholder='Введите логин...'/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Введите пароль...'/>
        <button onClick={handleRegister}>Регистрация</button>

        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

        <div className="row">
            <p>Есть аккаунт?</p><Link to='/login'>Войдите</Link>
        </div>
    </div>
  )
}
