import React from 'react';
import { selectLayout } from 'utils/selectLayout';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout';

const index = ({ children, location }) => {
  const layoutMap = { BaseLayout, LoginLayout };
  const Container = layoutMap[selectLayout(location.pathname)];
  return <Container>{children}</Container>;
};

export default index;
