import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateLogin, CreateSignup } from '@/main/factories/pages';
import { SurveyList } from '@/presentation/pages';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<CreateLogin />} />
        <Route path="/signup" element={<CreateSignup />} />
        <Route path="/" element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
