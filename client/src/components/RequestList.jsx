import React, { useState, useEffect } from 'react';
import styles from '../styles/RequestList.module.css'


const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/request/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json();
          setRequests(data.results);
        } else {
          console.error('Ошибка получения данных');
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса: ', error);
      }
    }

    fetchRequests()
  }, [token])

  return (
    <div>
      <h2>Ваши заявки</h2>
      {requests.length === 0 ? (
        <p>У вас нет заявок</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li className={styles.list} key={request.id}>
              <strong>Заявка #{request.id}</strong>
              
              <div>
                <p><span>Уникальный номер:</span> {request.unique_id || 'Нет данных'}</p>
                <p><span>Приоритет:</span> {request.prioriry || 'Нет данных'}</p>
                <p><span>Дата:</span> {request.date || 'Нет данных'}</p>
              </div>
              
              <div>
                <p><span>Устройство:</span> {request.gadget_name || 'Пусто'}</p>
                <p><span>Об устройстве:</span> {request.gadget_info || 'Пусто'}</p>
                <p><span>Неисправность:</span> {request.malfunction_type || 'Пусто'}</p>
              </div>
              
              <div>
                <p><span>Клиент:</span> {request.client_id || 'Пусто'}</p>
                <p><span>Статус:</span> {request.status || 'Пусто'}</p>
              </div>


              <div>
                <p><span>Дата завершения:</span> {request.date_of_completion || 'Пусто'}</p>
                <p><span>Время добавления:</span> {request.time_added || 'Пусто'}</p>
                <p><span>Комментарии:</span> {request.comments || 'Пусто'}</p>
                <p><span>Дополнение:</span> {request.addendum || 'Пусто'}</p>
              </div>
          </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestList;