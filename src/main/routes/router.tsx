import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateLogin, CreateSignup } from '@/main/factories/pages';
import { SurveyList } from '@/presentation/pages';
import { PrivateRoute } from '@/presentation/components';
import { ApiContext } from '@/presentation/context/api/api-context';
import {
  setLocalLoginAccountAdapter,
  getLocalLoginAccountAdapter,
} from '@/main/adapters';

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
          <Route path="/" element={<PrivateRoute element={<SurveyList />} />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
