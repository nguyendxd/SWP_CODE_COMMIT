import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from './authcontext'; // Adjust the import path as necessary

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  return user && allowedRoles.includes(user.roleId) ? (
    <Outlet />
  ) : (
    <Link to="/" />
  );
};

export default ProtectedRoute;
