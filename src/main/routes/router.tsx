import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import {
  CreateLogin,
  CreateSignup,
  CreateSurveyList,
  CreateSurveyResult,
} from '@/main/factories';
import { PrivateRoute } from '@/presentation/components';
import { loginApiState } from '@/presentation/context/api/api-state';
import {
  setLocalLoginAccountAdapter,
  getLocalLoginAccountAdapter,
} from '@/main/adapters';

const Router: React.FC = () => {
  const apiState = {
    getLoginAccount: getLocalLoginAccountAdapter,
    setLoginAccount: setLocalLoginAccountAdapter,
  };
  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(loginApiState, apiState);
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<CreateLogin />} />
          <Route path="/signup" element={<CreateSignup />} />
          <Route path="/" element={<PrivateRoute element={<CreateSurveyList />} />} />
          <Route
            path="/survey/:id"
            element={<PrivateRoute element={<CreateSurveyResult />} />}
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default Router;
