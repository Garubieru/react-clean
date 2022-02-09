import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateLogin, CreateSignup, CreateSurveyList } from '@/main/factories';
import { PrivateRoute } from '@/presentation/components';
import { ApiContext } from '@/presentation/context/api/api-context';
import {
  setLocalLoginAccountAdapter,
  getLocalLoginAccountAdapter,
} from '@/main/adapters';
import { SurveyResult } from '@/presentation/pages';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setLoginAccount: setLocalLoginAccountAdapter,
        getLoginAccount: getLocalLoginAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<CreateLogin />} />
          <Route path="/signup" element={<CreateSignup />} />
          <Route path="/" element={<PrivateRoute element={<CreateSurveyList />} />} />
          <Route path="/survey" element={<SurveyResult />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
