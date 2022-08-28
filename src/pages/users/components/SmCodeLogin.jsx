import React, { useState } from 'react';
import { Button, message } from 'antd';
import IconMap from 'components/IconMap';
import { loginRule } from 'utils/rules';
import $http from 'api';

const SmCodeLogin = ({ FormItem, Input, form }) => {
  const [disabled, setDisabled] = useState(true); //发送按钮是否禁用
  const [currentState, setCurrentState] = useState(true); //false表示已发送在倒计时
  const [codeLoading, setCodeLoading] = useState(false); //发送验证码loading
  let [currentTime, setCurrentTime] = useState(5); //倒计时

  //-发送验证码
  const sendSmCode = async () => {
    setCodeLoading(true);
    setDisabled(true);
    const mobile = await form.validateFields(['mobile']);
    console.log(mobile);
    const { code, msg } = await $http.getCode(mobile);
    if (code !== 0) {
      return;
    }
    setCodeLoading(false);
    message.success(msg);
    setCurrentState(false);
    runTime();
  };

  //-倒计时
  const runTime = () => {
    const timer = setInterval(() => {
      if (currentTime === 0) {
        clearInterval(timer);
        setDisabled(false);
        setCurrentTime(5);
        setCurrentState(true);
        return;
      }
      setCurrentTime(--currentTime);
    }, 1000);
  };

  //- 验证手机是否可以发送验证码
  const checkMobile = async () => {
    try {
      await form.validateFields(['mobile']);
      setDisabled(false);
    } catch (error) {
      setDisabled(true);
    }
  };
  return (
    <>
      <FormItem
        onChange={checkMobile}
        rules={loginRule.mobileRule}
        name="mobile"
        hasFeedback
      >
        <Input placeholder="请输入手机号码" prefix={IconMap.mobileIcon} />
      </FormItem>
      <FormItem rules={loginRule.codeRule} name="code" hasFeedback>
        <Input
          placeholder="请输入验证码"
          prefix={IconMap.codeIcon}
          addonAfter={
            <Button
              onClick={sendSmCode}
              loading={codeLoading}
              disabled={disabled}
            >
              {currentState ? '发送验证码' : `${currentTime}秒之后重新发送`}
            </Button>
          }
        />
      </FormItem>
    </>
  );
};

export default SmCodeLogin;
