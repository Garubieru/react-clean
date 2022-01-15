import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

type RouterProps = {
  login: React.FC;
  signup: React.FC;
};

const Router: React.FC<RouterProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<props.login />} />
        <Route path="/signup" element={<props.signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
