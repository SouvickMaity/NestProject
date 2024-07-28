import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  return (
   <>
   <div className="list-group">
  <h3> User Dashboard</h3>
  
  <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">profile</NavLink>
  <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
  
</div>

    </>
  );
};

export default UserMenu;