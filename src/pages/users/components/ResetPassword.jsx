import React from 'react';
import IconMap from 'components/IconMap';
import { loginRule } from 'utils/rules';

const resetPassword = ({ FormItem, Input, form }) => {
  return (
    <>
      <FormItem name="newPassword" rules={loginRule.passwordRule} hasFeedback>
        <Input
          placeholder="请输入新密码"
          prefix={IconMap.passwordIcon}
          type="password"
        />
      </FormItem>
      <FormItem
        name="confirmPassword"
        rules={loginRule.confirmPasswordRule(form)}
        hasFeedback
      >
        <Input
          placeholder="请再次输入新密码"
          prefix={IconMap.passwordIcon}
          type="password"
        />
      </FormItem>
    </>
  );
};

export default resetPassword;
