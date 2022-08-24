import React from 'react';
import IconMap from 'components/IconMap';
import { loginRule } from 'utils/rules';

const AccountLogin = ({ FormItem, Input }) => {
  return (
    <>
      <FormItem name="accountName" rules={loginRule.userRule} hasFeedback>
        <Input placeholder="请输入账号" prefix={IconMap.userIcon} />
      </FormItem>
      <FormItem name="password" rules={loginRule.codeRule} hasFeedback>
        <Input
          type="password"
          placeholder="请输入密码"
          prefix={IconMap.passwordIcon}
        />
      </FormItem>
    </>
  );
};

export default AccountLogin;
