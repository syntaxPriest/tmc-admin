import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isLoggedIn = localStorage.getItem('expire_time');
// eslint-disable-next-line react/prop-types
export const PrivateLoginRoute = ({isAuthenticated, isInVerifyLobby}) => {
  return isLoggedIn && isLoggedIn !== "undefined" && !isInVerifyLobby ? <Outlet /> : <Navigate to="/login" />;
  // return <Outlet />;
};

// eslint-disable-next-line react/prop-types
export const PreventAuthRoute = ({isAuthenticated}) => {
  return isLoggedIn && isLoggedIn !== "undefined" ? <Navigate to="/dashboard" /> : <Outlet />;
  // return <Outlet />;
};

// eslint-disable-next-line react/prop-types
export const PrivateVerify = ({isInVerifyLobby}) => {
  return isInVerifyLobby ? <Outlet /> : <Navigate to="/login" />;
};