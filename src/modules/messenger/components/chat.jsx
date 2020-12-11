import React, {useState, useEffect, useRef} from 'react';
import Socket from '../../../shared/socketConfig';
import { Card, Input } from 'antd';
import userDefault from '../../../shared/images/userDefault.png';

import SaveMessage from '../services/saveMessage';
import GetUserByIDService from '../services/getUserByID.service';
import './chat.css';

const Chat = ({name, userAvatar, msgDB}) => {
  const [mensaje, setMensaje] = useState('');
  const [msgs, setMsgs] = useState([]);
  const a = (msgDB.data && msgDB.data.length !== 0) ? msgDB.data.map((e) => e.message_id_user === name.idUser) : [];

  useEffect(() => {
    if (msgDB.data && msgDB.data.length !== 0) {
      const config = msgDB.data.map((msg, i) => {
        return {
          msg: msg.message_body,
          name: {
            idUser: a[i] === true ? name.idUser : 'User',
            lastname: a[i] === true ? name.lastname : 'User',
            name: a[i] === true ? name.name : 'User',
          }
        }
      });

      setMsgs(config)
    }
  }, [msgDB])

  useEffect(() => {
    Socket.emit('conectado', name)
  }, [name]);

  useEffect(() => {
    Socket.on('mensajes', mensaje => {
      setMsgs([...msgs, mensaje])
    })

    return () => Socket.off()
  }, [msgs])

  const onSubmit = (e) => {
    e.preventDefault();

    if (mensaje === '') {
      return;
    }

    Socket.emit('mensaje', name, mensaje);
    const resp = SaveMessage({
      msg: mensaje,
      idUser: name.idUser
    })
      .then((resp) => {
        if (resp.errorManager && resp.errorManager.status === 200) {
          console.log('guardado :D');
        } else {
          console.log('error', resp.data.message.message_id_user);
        }
      })
    setMensaje('')
  };

  const divRef = useRef(null)
  useEffect(() => {
    divRef.current.scrollIntoView({behavior: 'smooth'})
  })

  return (
    <Card>
      <div className="frame scrollbar">
        <ul>
          {
            msgDB.length !== 0 ? (
              msgs.map((e, i) => {
                if (a[i]) {
                  return (
                    <li style={{
                      width: '100%'}}
                        key={i}>
                      <div className="msj macro">
                        <div className="avatar">
                          <img
                            className="img-circle"
                            style={{width: '100%'}}
                            src={userAvatar ? userAvatar : userDefault}
                            alt={`img-${e.name ? e.name.name : ''}`}/>
                        </div>
                        <div className="text text-r">
                          <p><strong>{`${e.name ? e.name.name : '' }:`}</strong> <span>{e.msg}</span></p>
                          <p><small></small></p>
                        </div>
                      </div>
                    </li>
                  )
                } else {
                  return (
                    <li style={{width: '100%'}}>
                      <div className="msj-rta macro">
                        <div className="text text-r">
                          <p><strong>{`${e.name ? e.name.name : '' }:`}</strong> <span>{e.msg}</span></p>
                          <p><small></small></p>
                        </div>
                        <div className="avatar" style={{padding: '0px 0px 0px 10px !important'}}>
                          <img
                            className="img-circle"
                            style={{width: '100%'}}
                            src={userAvatar ? userAvatar : userDefault}
                            alt={`img-${e.name ? e.name.name : ''}`}/>
                        </div>
                      </div>
                    </li>
                  )
                }
              })
            ) : null
          }
          <div ref={divRef} />
        </ul>
      </div>
      <form onSubmit={onSubmit}>
        <div className="msj-rta macro">
          <div className="text text-r" style={
            {
              background:'#d4d4d4!important',
              display: 'flex',
              flexDirection: 'revert',
              width: '100%'
            }
          }>
            <Input
              className="mytext"
              placeholder="Escribe un mensaje"
              value={mensaje} onChange={event => setMensaje(event.target.value)}
            />
                                <button type="submit" className="bg-blue btn-send">Enviar</button>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default Chat;
