import { SurveyList } from '@/presentation/pages';
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
        <Route path="/" element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
