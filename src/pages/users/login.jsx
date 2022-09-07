import React, { useState } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import AccountLogin from './components/AccountLogin';
import SmCodeLogin from './components/SmCodeLogin';
import IconMap from 'components/IconMap';
import logoImg from 'common/img/logo.gif';
import './css/login.less';
import { useDispatch, useSelector } from 'umi';

const FormItem = Form.Item;

const login = ({ history }) => {
  const [form] = Form.useForm();
  const [type, setType] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const ComponentSelector = (props) =>
    !type ? <AccountLogin {...props} /> : <SmCodeLogin {...props} />;

  const submitUserInfo = (data) => {
    console.log(data);
    dispatch({ type: 'user/login', payload: { ...data, type } });
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
          {/* 如果没写form里面的登录按钮没写htmlType="submit"那么你不填写任何值点击登录也不会进行验证 */}
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={loading.effects['user/login']}
          >
            登录
          </Button>
        </Row>
        <Row className="ft-12">
          <Col
            span="6"
            onClick={() => {
              history.push('/users/forgotPassword');
            }}
          >
            忘记密码？
          </Col>
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
