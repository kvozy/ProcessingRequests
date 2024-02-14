import React, { useState } from 'react';
import { RegisterForm } from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes } from './routes';
import './styles/App.css'
const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  const updateAuthStatus = () => {
    setIsAuth(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginForm onLoginSuccess={updateAuthStatus} />} />
        <Route path='/registration' element={<RegisterForm />} />
        {isAuth && authRoutes.map(({ path, Component }) =>
          <Route key={path} path={path} element={<Component />} />
        )}

        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;