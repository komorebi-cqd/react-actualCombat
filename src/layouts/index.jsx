import React from 'react';
import { selectLayout } from 'utils/selectLayout';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout';
import Loading from 'components/Loading';
import { useSelector } from 'umi';

const index = ({ children, location }) => {
  const layoutMap = { BaseLayout, LoginLayout };
  const Container = layoutMap[selectLayout(location.pathname)];
  const loading = useSelector((state) => state.loading);

  return (
    <Container>
      <Loading isShow={loading.effects['user/login']} />
      {children}
    </Container>
  );
};

export default index;
