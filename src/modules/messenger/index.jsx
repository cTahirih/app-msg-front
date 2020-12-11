import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import Chat from './components/chat';
import MsgService from './services/getMsg.service';

import './messenger.css';

const Messenger = () => {
  const [name, setNombre] = useState({})
  const [userAvatar, setUserAvatar] = useState('');
  const [msgDB, setMsgDB] = useState([]);
  const history = useHistory();

  useEffect(() => {
    MsgService().then((resp) => {
      console.log(resp);
      if (resp.data.errorManager && resp.data.errorManager.status === 200) {
        setMsgDB(resp.data)
      } else {
        console.log('error', resp);
      }
    })
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));

    setNombre({
      idUser: data.id,
      name: data.name,
      lastname: data.lastname
    });

    setUserAvatar(data.avatar)
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <div className="">
      <Row style={{width: '100%'}}>
        <Col xs={24} className="chat-header">
          <h1>{`Hola ${name.name}`}</h1>
          <Button className="bg-blue" type="primary" onClick={handleLogOut}>Cerrar sesión</Button>
        </Col>
      </Row>
      <Row justify="center" style={{width: '100%'}}>
        <Col xs={24} md={15}>
          <div className="App">
            <Chat name={name} avatar={userAvatar} msgDB={msgDB}/>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Messenger;
