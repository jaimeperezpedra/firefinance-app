import React from 'react';
import { HashRouter as Router, Outlet } from "react-router-dom";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { ToastContainer } from 'react-toastify';

import store from './store/store'
import { MainRoutes } from './MainRoutes';
import 'react-toastify/dist/ReactToastify.css';

let persistor = persistStore(store);

export const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}
