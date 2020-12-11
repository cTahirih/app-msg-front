import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'antd';

import LoginService from '../../services/login.service';
import { Row, Col, Form, Button, Checkbox, Input, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone, FacebookFilled, GoogleOutlined } from '@ant-design/icons';

import './formLogin.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormLogin = () => {
  const history = useHistory();
  const onFinish = values => {
    const resp = LoginService({
      email: values.username,
      password: values.password
    })
      .then((resp) => {
        if (resp.errorManager && resp.errorManager.status === 200) {
          localStorage.setItem('token', JSON.stringify(resp.data.accessToken));
          localStorage.setItem('user', JSON.stringify(resp.data.user))
          history.push('/messenger')
        } else {
          console.log('error', resp);
        }
      })
      .catch();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card xs={24}>
      <h1>Log In</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
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

        <Form.Item {...tailLayout}>
          <Button size="large" type="primary" htmlType="submit" className="bg-blue">
            Ingresar
          </Button>
        </Form.Item>
      </Form>
      <Row>
        <Col span={24}>
          <p>O iniciar sesión con:</p>
          <Row justify="center">
            <Button type="primary" icon={<FacebookFilled />} className="mr-4"/>
            <Button type="primary" danger icon={<GoogleOutlined />} />
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default FormLogin;
