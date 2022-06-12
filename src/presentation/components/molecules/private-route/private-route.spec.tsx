import React from 'react';
import { Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render, RenderResult } from '@testing-library/react';

import { mockAccount } from '@/domain/test';
import { loginApiState } from '@/presentation/context/api/api-state';
import PrivateRoute from '.';

const Page: React.FC = () => {
  return <div>Page</div>;
};

type SutType = {
  history: MemoryHistory;
  sut: RenderResult;
};

const createSut = (account = mockAccount()): SutType => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const sut = render(
    <RecoilRoot
      initializeState={({ set }) =>
        set(loginApiState, { getLoginAccount: () => account })
      }
    >
      <Router location={history.location} navigator={history}>
        <PrivateRoute element={<Page />} />
      </Router>
    </RecoilRoot>,
  );
  return {
    sut,
    history,
  };
};

describe('PrivateRoute', () => {
  beforeEach(() => jest.clearAllMocks());
  it('Should not redirect to /login if token is valid', () => {
    const { history } = createSut();
    expect(history.location.pathname).toBe('/');
  });

  it('Should redirect to /login if token is invalid', () => {
    const { history } = createSut(null);
    expect(history.location.pathname).toBe('/login');
  });
});
