import React, {useState} from 'react';
import { Row, Col, Modal } from 'antd';
import LoginImage from '../../shared/images/login-images.svg';

import FormLogin from './components/formLogin';
import FormRegister from './components/formRegister';
import './login.css';

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleOk = (e) => {
    setShowModal(false);
  };

  const handleCancel = (e) => {
    setShowModal(false);
  };

  return (
    <div className="main">
      <Row>
        <Col xs={24} md={12} className="card-left">
          <div className="box-image">
            <img src={LoginImage} alt="Login image" className="image-fluid"/>
          </div>
          <Row justify="center">
            <Col style={{textAlign: 'center'}}>
              <p className="text-register" style={{marginTop: 10, marginBottom: 2}}>No tienes una cuenta?</p>
              <p className="text-underline text-register" onClick={handleShowModal}>Regístrate aquí</p>
            </Col>
          </Row>
          <Modal
            title="Registro"
            visible={showModal}
            onCancel={handleCancel}
            footer={null}
          >
            <FormRegister showModal={showModal}/>
          </Modal>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <FormLogin />
          <Row justify="center" className="card-right-btm">
            <Col style={{textAlign: 'center'}}>
              <p className="text-register" style={{marginTop: 10, marginBottom: 2}}>No tienes una cuenta?</p>
              <p className="text-underline text-register" onClick={handleShowModal}>Regístrate aquí</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
