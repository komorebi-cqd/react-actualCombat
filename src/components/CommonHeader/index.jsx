import React from 'react';
import IconMap from '../IconMap';
import { Avatar, Menu } from 'antd';
import defaultAvatar from 'common/img/avatar.jpg';
import { useSelector } from 'umi';

const CommonHeader = ({ Header, collapse, changeCollapse }) => {
  const { userInfo } = useSelector((state) => state.user);
  const loginOut = (e) => {
    if (e.key === 'quit') {
      localStorage.clear();
      window.location.href = '/user/login';
    }
  };

  const MenuTitle = (
    <>
      <span>{userInfo.userName}</span>
      <Avatar style={{ marginLeft: 0 }} src={defaultAvatar} />
    </>
  );

  const items = [
    {
      label: '',
      icon: MenuTitle,
      key: 'avatar',
      children: [{ label: '退出登录', icon: IconMap.signOut, key: 'quit' }],
    },
  ];

  return (
    <Header className="header-wrapper">
      <div className="button" onClick={changeCollapse}>
        {collapse ? IconMap.rightArrow : IconMap.leftArrow}
      </div>
      <Menu mode="horizontal" items={items} onClick={loginOut}></Menu>
    </Header>
  );
};

export default CommonHeader;
