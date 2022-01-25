import React from 'react';
import { MainHeader } from '@/presentation/components';
import { ApiContext } from '@/presentation/context/api/api-context';
import { fireEvent, render, screen } from '@testing-library/react';
import { AccountModel } from '@/domain/models';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { mockAccount } from '@/domain/test';

type SutType = {
  setLoginAccountMock: jest.Mock<void, [AccountModel]>;
  getLoginAccountMock: jest.Mock<AccountModel, []>;
  history: MemoryHistory;
};

const createSut = (account = mockAccount()): SutType => {
  const setLoginAccountMock = jest.fn();
  const getLoginAccountMock = jest.fn(() => account);

  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <ApiContext.Provider
      value={{
        setLoginAccount: setLoginAccountMock,
        getLoginAccount: () => account,
      }}
    >
      <Router location={history.location} navigator={history}>
        <MainHeader />
      </Router>
    </ApiContext.Provider>,
  );
  return {
    setLoginAccountMock,
    getLoginAccountMock,
    history,
  };
};

describe('MainHeader Component', () => {
  it('Should call setLoginAccount and redirect to /login if signout link is clicked', () => {
    const { history, setLoginAccountMock } = createSut();
    fireEvent.click(screen.getByTestId('signout-link'));
    expect(setLoginAccountMock).toHaveBeenCalledWith(null);
    expect(history.location.pathname).toBe('/login');
  });

  it('Should show correct userName in getLoginAccount', () => {
    const { getLoginAccountMock } = createSut();
    expect(screen.getByTestId('user-name')).toHaveTextContent(getLoginAccountMock().name);
  });
});
