import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

type RouterProps = {
  login: React.FC;
  signup: React.FC;
};

const Router: React.FC<RouterProps> = ({ login: Login, signup: Signup }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
