import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

type RouterProps = {
  CreateLogin: React.FC;
};

const Router: React.FC<RouterProps> = ({ CreateLogin }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<CreateLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
