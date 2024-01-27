import React from "react";

import "./user.css";
import { NavLink, Outlet } from "react-router-dom";

const User = (props) => {
  return (
    <main className="user-wrapper">
      <article className="user-content">
        <Outlet></Outlet>
      </article>
      <div className="user-actions">
        <NavLink to="favorite">
          <span className="material-symbols-rounded">favorite</span>
        </NavLink>
        <NavLink to="trending">
          <span className="material-symbols-rounded">
            local_fire_department
          </span>
        </NavLink>
        <NavLink to="account">
          <span className="material-symbols-rounded">account_circle</span>
        </NavLink>
      </div>
    </main>
  );
};

export default User;
