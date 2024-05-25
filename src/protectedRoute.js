import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const PrivateLoginRoute = ({isAuthenticated, isInVerifyLobby}) => {
  return isAuthenticated && isAuthenticated !== "undefined" && !isInVerifyLobby ? <Outlet /> : <Navigate to="/login" />;
};

// eslint-disable-next-line react/prop-types
export const PreventAuthRoute = ({isAuthenticated}) => {
  return isAuthenticated && isAuthenticated !== "undefined" ? <Navigate to="/dashboard" /> : <Outlet />;
};

// eslint-disable-next-line react/prop-types
export const PrivateVerify = ({isInVerifyLobby}) => {
  return isInVerifyLobby ? <Outlet /> : <Navigate to="/login" />;
};