import React, {useState, useEffect, useRef} from 'react';
import Socket from '../../../shared/socketConfig';

const Chat = ({name, userAvatar}) => {
  console.log(name);
  const [mensaje, setMensaje] = useState('')
  const [msgs, setMsgs] = useState([])

  useEffect(() => {
    Socket.emit('conectado', name)
  }, [name]);

  useEffect(() => {
    Socket.on('mensajes', mensaje => {
      console.log(mensaje);
      setMsgs([...msgs, mensaje])
    })

    return () => Socket.off()
  }, [msgs])

  const onSubmit = (e) => {
    e.preventDefault();

    Socket.emit('mensaje', name, mensaje);
    setMensaje('')
  }

  const divRef = useRef(null)
  useEffect(() => {
    divRef.current.scrollIntoView({behavior: 'smooth'})
  })

  return (
    <div>
      <div className="chat">
        {
          msgs.map((e, i) => (
            <div key={i}>{`${e.name.name} ${e.msg}`}</div>
          ))
        }
        <div ref={divRef} />
      </div>
      <form onSubmit={onSubmit}>
        <label htmlFor="">Escriba su mensaje</label>
        <textarea name="" id="" cols="30" rows="10" value={mensaje} onChange={event => setMensaje(event.target.value)}>

      </textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Chat;
