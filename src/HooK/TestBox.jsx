import React from 'react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import NotFoundPag from "../components/NotFoundPage/NotFoundPage";
import hasPermission from './functions';
const TestBox = ({ children, data }) => {

  return (hasPermission(data) ? children : <Navigate to="/admin" replace={true} />)

    ;
}

export default TestBox;
