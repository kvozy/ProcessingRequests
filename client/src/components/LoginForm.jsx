import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      // console.log('Автоматический вход с сохраненным токеном:', storedToken);
      onLoginSuccess();
      navigate('/home');
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/user/login', { login, password });
      const token = response.data.token;

      if (token) {
        console.log('Вход выполнен успешно. Токен:', token);
        localStorage.setItem('authToken', token);

        onLoginSuccess();
        navigate('/home');
      } else {
        console.error('Ошибка во время входа: Пользователь не найден');
        setErrorMessage('Некорректные данные');
      }
    } catch (error) {
      console.error('Ошибка во время входа:', error.response?.data?.message || 'Неожиданная ошибка');
      console.error('Полные детали ошибки:', error);
    }
  };

  return (
    <div>
        <h1>Авторизация</h1>
        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Введите логин..." />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Введите пароль..." />
        <button onClick={handleLogin}>Войти</button>

        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

        <div className="row">
          <p>Нет аккаунта?</p>
          <Link to="/registration">Зарегистрируйся</Link>
        </div>
    </div>
  );
};

export default LoginForm;