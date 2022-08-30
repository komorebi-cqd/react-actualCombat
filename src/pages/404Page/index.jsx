import React from 'react';
import { Link } from 'umi';
import notFoundImg from 'common/img/404.png';
import './index.less';

const notFound = () => {
  return (
    <div className="not-found">
      <p>Opps!</p>
      <span>You are lost</span>
      <img src={notFoundImg} alt="404" />
      <Link className="go-home" to="/">
        go home
      </Link>
    </div>
  );
};

export default notFound;
