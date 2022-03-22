import React from 'react';
import { HashRouter as Router, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import { MainRoutes } from './MainRoutes';
import 'react-toastify/dist/ReactToastify.css';


export const App = () => {

  return (
    <Router>
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme={'colored'}
      />
      <MainRoutes />
      <Outlet />
    </Router>
  );
}
