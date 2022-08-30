import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;
import { history } from 'umi';
import './baseLayout.less';
import SiderBar from '../components/SiderBar';
import CommonHeader from '../components/CommonHeader';
import NotFound from '../pages/404Page/index';

const BaseLayout = ({ children }) => {
  const routeList = JSON.parse(sessionStorage.getItem('routeList'));
  const {
    location: { pathname },
  } = history;
  const [collapse, setCollapse] = useState(false);

  const changeCollapse = () => setCollapse(!collapse);

  const routeVerify = () => {
    if (pathname === '/') {
      history.push(routeList[0].route);
      return true;
    }
    return routeList.some((item) => item.route === pathname);
  };

  return (
    <Layout className="container">
      <SiderBar Sider={Sider} Menu={Menu} collapse={collapse} />
      <Layout>
        <CommonHeader
          Header={Header}
          collapse={collapse}
          changeCollapse={changeCollapse}
        />
        <Content>{routeVerify() ? children : <NotFound />}</Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
