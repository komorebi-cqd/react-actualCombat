import React from 'react';
import bz3 from 'common/img/bz3.jpg';
import { history } from 'umi';
import IconMap from '../IconMap';

const SiderBar = ({ Sider, Menu, collapse }) => {
  const pathname = history.location.pathname;
  const routeList = JSON.parse(localStorage.getItem('routeList'));
  const newRouteList = routeList?.map((item) => {
    item.label = item.zhName;
    item.icon = IconMap[item.icon];
    item.key = item.route;
    delete item.zhName;

    return item;
  });
  const jumpUrl = (e) => {
    history.push(e.key);
  };
  return (
    <Sider theme="light" className="side-bar" collapsed={collapse}>
      <div className="brand">
        <div className="logo">
          <img src={bz3} alt="" />
          {collapse || <h1>草帽海贼团</h1>}
        </div>
      </div>
      <div className="menu-container">
        <Menu
          onClick={jumpUrl}
          mode="inline"
          items={newRouteList}
          selectedKeys={pathname}
        />
      </div>
    </Sider>
  );
};

export default SiderBar;
