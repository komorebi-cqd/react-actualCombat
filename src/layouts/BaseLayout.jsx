import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;
import { history } from 'umi';
import './baseLayout.less';
import { useSelector } from 'umi';
import SiderBar from '../components/SiderBar';
import CommonHeader from '../components/CommonHeader';
import NotFound from '../pages/404Page/index';
import Loading from '../components/Loading';

const BaseLayout = ({ children }) => {
  const loading = useSelector((state) => state.loading);
  // console.log(loading);
  const routeList = JSON.parse(localStorage.getItem('routeList'));
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
    return routeList?.some((item) => item.route === pathname);
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
        <Content className="main-content">
          {routeVerify() ? (
            <>
              <Loading
                part={true}
                isShow={
                  loading.effects['dashboard/initDashboardList'] ||
                  loading.effects['attendance/initAttendanceList']
                }
              />
              {children}
            </>
          ) : (
            <NotFound />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
