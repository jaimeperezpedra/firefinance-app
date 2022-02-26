import * as React from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import PropTypes from 'prop-types';

import * as Pages from './pages' 
import { Layout } from './pages/layout/Layout';
import { useSelector } from 'react-redux';


export const MainRoutes = () => 
  <Routes>
    <Route path="/login" element={<Pages.Login />} />
    <Route
      path="/"
      element={<RequireAuth><Layout /></RequireAuth>}>
      <Route path="/create-expense" element={<Pages.CreateExpense />} />
      <Route path="/list-expenses" element={<Pages.ListExpenses />} />
      <Route path="/config" element={<Pages.Config />} />
      <Route path="/profile" element={<Pages.Profile />} />
      <Route path="/income" element={<Pages.Income />} />
    </Route>
  </Routes>;


function RequireAuth({ children }) {
  const credentials = useSelector(state => state.credentials);
  let location = useLocation();
  console.log(credentials);
  if (!credentials.values.idToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node,
}