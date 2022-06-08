import React from 'react';
import { Navigate } from 'react-router-dom';
import AccountServices from './services/account-service';
  
const PrivateRoute = ({ children }) => {
    
       const isAuthenticated = AccountServices.isAuthenticated;
       if (isAuthenticated ) {
           return children
       }    
         return <Navigate to="/login" />
}

  
export default PrivateRoute;