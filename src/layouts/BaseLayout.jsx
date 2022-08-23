import React from 'react';

const BaseLayout = ({ children }) => {
  return (
    <>
      <h1>头部</h1>
      {children}
    </>
  );
};

export default BaseLayout;
