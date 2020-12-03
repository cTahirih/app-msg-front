import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Card, Checkbox, Input, Space } from 'antd';
import Chat from './components/chat';
import './messenger.css';

const Messenger = () => {
  const [name, setNombre] = useState({})
  const [userAvatar, setUserAvatar] = useState('');


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));

    console.log(data.name);
    setNombre({
      name: data.name,
      lastname: data.lastname
    });

    setUserAvatar(data.avatar)
  }, []);
  return (
    <div className="main-msg">
      <Row justify="center" style={{width: '100%'}}>
        <Col xs={24} md={15}>
          <div className="App">
            <Chat name={name} avatar={userAvatar}/>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Messenger;
