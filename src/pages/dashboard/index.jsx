import React, { useEffect } from 'react';
import StaffAmount from './component/StaffAmount';
import OldStaffTable from './component/OldStaffTable';
import { useSelector, useDispatch } from 'umi';
import './css/index.less';

const dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'dashboard/initDashboardList' });
  }, []);
  const { amountDataList, staffData } = useSelector((state) => state.dashboard);
  console.log(amountDataList, staffData);
  return (
    <div className="dashboard-container">
      {/* 员工展示组件 */}
      {amountDataList.map((item, index) => (
        <StaffAmount {...item} key={index} />
      ))}

      {/*  */}
      <OldStaffTable {...staffData} />
    </div>
  );
};

export default dashboard;
