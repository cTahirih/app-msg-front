import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Checkbox, Input, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import './formRegister.css';
import RegisterService from '../../services/register.service';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormRegister = ({ showModal }) => {
  const [ registerSuccess, setRegisterSuccess ] = useState(false);

  useEffect(() => {
    if (!showModal) {
      setRegisterSuccess(false)
    }
  }, [showModal]);
  const onFinish = values => {
    const resp = RegisterService({
      email: values.username,
      password: values.password,
      name: values.names,
      lastname: values.lastName,
      image: 'http://image.com'
    }).then(
      (resp) => {
        if (resp.errorManager && resp.errorManager.status === 200) {
/*          localStorage.setItem('user', JSON.stringify(resp.data));*/
          setRegisterSuccess(true);
        } else {
          console.log('error', resp);
        }
      }
    );
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {
        registerSuccess === false ?
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="names"
                  rules={[{ required: true, message: 'El campo es requerido' }]}
                >
                  <Input size="large" placeholder="Ingrese sus nombres" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: 'El campo es requerido' }]}
                >
                  <Input size="large" placeholder="Ingrese sus apellidos" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'El campo es requerido' }]}
            >
              <Input size="large" placeholder="Ingrese su email" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'El campo es requerido' }]}
            >
              <Input.Password
                size="large"
                placeholder="Ingrese su contresaña"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Recordar usuario</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout} justify='center'>
              <Button size="large" type="primary" htmlType="submit" className="bg-blue">
                Ingresar
              </Button>
            </Form.Item>
          </Form>
        : <>
            <Card>
              <h1>Registro exitoso</h1>
            </Card>
          </>
      }
    </>
  );
};

export default FormRegister;
