import React, { useState } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import AccountLogin from './components/AccountLogin';
import SmCodeLogin from './components/SmCodeLogin';
import IconMap from 'components/IconMap';
import logoImg from 'common/img/logo.gif';
import './css/login.less';

const FormItem = Form.Item;

const login = () => {
  const [form] = Form.useForm();
  const [type, setType] = useState(1);

  const ComponentSelector = (props) =>
    !type ? <AccountLogin {...props} /> : <SmCodeLogin {...props} />;

  const submitUserInfo = (data) => {
    console.log(data);
  };

  return (
    <div className="form">
      <div className="logo">
        <img src={logoImg} alt="" />
        <span>后台人事管理系统</span>
      </div>
      <Form form={form} onFinish={submitUserInfo}>
        {ComponentSelector({ form, Input, FormItem })}
        <Row>
          <Button block type="primary">
            登录
          </Button>
        </Row>
        <Row className="ft-12">
          <Col span="6">忘记密码？</Col>
          <Col
            span="18"
            className="align-right"
            onClick={() => {
              !type ? setType(1) : setType(0);
            }}
          >
            {!type ? '使用手机号码进行登录' : '使用账户名进行登录'}
            {IconMap.arrowRight}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default login;
