import { mockAccount } from '@/domain/test';
import { ApiContext } from '@/presentation/context/api/api-context';
import { render, RenderResult } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import PrivateRoute from './private-route';

const Page: React.FC = () => {
  return <div>Oi</div>;
};

type SutType = {
  history: MemoryHistory;
  sut: RenderResult;
};

const createSut = (account = mockAccount()): SutType => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const sut = render(
    <ApiContext.Provider value={{ getLoginAccount: () => account }}>
      <Router location={history.location} navigator={history}>
        <PrivateRoute element={<Page />} />
      </Router>
    </ApiContext.Provider>,
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
