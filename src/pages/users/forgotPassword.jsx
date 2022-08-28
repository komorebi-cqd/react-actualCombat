import React, { useState } from 'react';
import ResetPassword from './components/ResetPassword';
import SmCodeLogin from './components/SmCodeLogin';
import { Button, Form, Row, Input, message } from 'antd';
import './css/login.less';
import $http from 'api';

const FormItem = Form.Item;

const forgotPassword = ({ history }) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(2);

  const ComponentSelector = (props) =>
    currentStep === 1 ? (
      <SmCodeLogin {...props} />
    ) : (
      <ResetPassword {...props} />
    );

  const submitSelect = async (nData) => {
    if (currentStep === 1) {
      const { data, msg } = await $http.checkSmCode({ smCode: nData.code });
      if (!data) {
        message.error(msg);
        return;
      }
      setCurrentStep(2);
    } else {
      const { data, msg } = await $http.resetPassword({
        newPassword: nData.newPassword,
      });
      if (!data) {
        message.error(msg);
        return;
      }
      message.success(msg);
      history.replace('/users/login');
    }
  };

  return (
    <div className="form forgotPassword">
      <div className="forget-password-title">
        {currentStep === 1 ? '忘记密码' : '重置密码'}
      </div>
      <Form form={form} onFinish={submitSelect}>
        {ComponentSelector({ form, Input, FormItem })}
        <Row>
          <Button block type="primary" htmlType="submit">
            {currentStep === 1 ? '下一步' : '重置密码'}
          </Button>
        </Row>
        <Row>
          <Button
            className="goback"
            onClick={() => {
              history.replace('/users/login');
            }}
            block
            type="primary"
          >
            返回登录
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default forgotPassword;
