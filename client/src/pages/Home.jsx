import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestList from '../components/RequestList';
const Home = () => {

  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const decodedToken = parseJwt(authToken);

      const login = decodedToken?.login;
      const role = decodedToken?.role;

      setUsername(login);
      setRole(role);
    }
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login')
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div>
      <h2>Добро пожаловать в систему!</h2>
      <div className="user-info-logout">
        <div className="user-info">
          <span>user:</span>{username && <p>{username}</p>}
          <span>role:</span>{role && <p>{role}</p>}
        </div>
        <button className='logout' onClick={handleLogout}>Выйти</button>
      </div>
      <RequestList />
    </div>
  );
};

export default Home;