import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateLogin, CreateSignup } from '@/main/factories/pages';
import { SurveyList } from '@/presentation/pages';
import { ApiContext } from '@/presentation/context/api/api-context';
import { setLocalLoginAccountAdapter } from '@/main/adapters';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setLoginAccount: setLocalLoginAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<CreateLogin />} />
          <Route path="/signup" element={<CreateSignup />} />
          <Route path="/" element={<SurveyList />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
