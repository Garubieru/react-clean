import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, screen } from '@testing-library/react';

import { ValidationStub, RemoteSignupSpy, Helpers } from '@/presentation/test';
import { ApiContext } from '@/presentation/context/api/api-context';
import { RequiredFieldError } from '@/presentation/validation/errors';

import { mockSignupParams } from '@/domain/test';
import { EmailInUseError } from '@/domain/errors';
import { Signup as SignupProtocol } from '@/domain/usecases';

import Signup from '.';

type SutType = {
  validationStub: ValidationStub;
  remoteSignupSpy: RemoteSignupSpy;
  setLoginAccount: jest.Mock<void, [SignupProtocol.Model]>;
};

type SutParams = {
  withError?: boolean;
  populateForm?: boolean;
  formParams?: SignupProtocol.Params;
};

const history = createMemoryHistory({ initialEntries: ['/signin'] });
const createSut = (params?: SutParams): SutType => {
  const validationStub = new ValidationStub();
  const remoteSignupSpy = new RemoteSignupSpy();
  const setLoginAccount = jest.fn();
  if (params?.withError) validationStub.errorMessage = new RequiredFieldError().message;
  render(
    <ApiContext.Provider value={{ setLoginAccount }}>
      <Router location={history.location} navigator={history}>
        <Signup validations={validationStub} remoteSignup={remoteSignupSpy} />
      </Router>
    </ApiContext.Provider>,
  );
  if (params?.populateForm) populateForm(params?.formParams);
  return {
    validationStub,
    remoteSignupSpy,
    setLoginAccount,
  };
};

const populateForm = (params = mockSignupParams()): void => {
  Helpers.populateField('name', params.name);
  Helpers.populateField('email', params.email);
  Helpers.populateField('password', params.password);
  Helpers.populateField('passwordConfirmation', params.passwordConfirmation);
};

describe('Signup Component', () => {
  it('Should render with initial state and throw error when validation fails', () => {
    const { validationStub } = createSut({ withError: true });
    Helpers.testFieldStatus('name', validationStub.errorMessage);
    Helpers.testFieldStatus('email', validationStub.errorMessage);
    Helpers.testFieldStatus('password', validationStub.errorMessage);
    Helpers.testFieldStatus('passwordConfirmation', validationStub.errorMessage);
    expect(screen.getByTestId('create-btn')).toBeDisabled();

    Helpers.testErrorContainer('error-msg', '');
  });

  it('Should show name error if validations throws error', () => {
    const { validationStub } = createSut({ withError: true });
    Helpers.populateField('name');
    Helpers.testFieldStatus('name', validationStub.errorMessage);
  });

  it('Should show email error if validations throws error', () => {
    const { validationStub } = createSut({ withError: true });
    Helpers.populateField('email');
    Helpers.testFieldStatus('email', validationStub.errorMessage);
  });

  it('Should show name error if validations throws error', () => {
    const { validationStub } = createSut({ withError: true });
    Helpers.populateField('password');
    Helpers.testFieldStatus('password', validationStub.errorMessage);
  });

  it('Should show name error if validations throws error', () => {
    const { validationStub } = createSut({ withError: true });
    Helpers.populateField('passwordConfirmation');
    Helpers.testFieldStatus('passwordConfirmation', validationStub.errorMessage);
  });

  it('Should button be enabled when form has no errors', () => {
    createSut({ withError: false });
    expect(screen.getByTestId('create-btn')).toBeEnabled();
  });

  it('Should show spinner when form is submitting', async () => {
    createSut({ withError: false });
    await Helpers.submitForm('signup-form');
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('Should call remoteSignup.create with correct params', async () => {
    const params = mockSignupParams();
    const { remoteSignupSpy } = createSut({
      populateForm: true,
      formParams: params,
    });
    await Helpers.submitForm('signup-form');
    expect(remoteSignupSpy.params).toEqual(params);
  });

  it('Should not call remoteSignup.create if form is invalid', async () => {
    const { remoteSignupSpy } = createSut({
      populateForm: true,
      withError: true,
    });
    await Helpers.submitForm('signup-form');
    expect(remoteSignupSpy.callsCount).toBe(0);
  });

  it('Should form and button be disabled while form is submitting', async () => {
    const { remoteSignupSpy } = createSut({
      populateForm: true,
    });
    await Helpers.submitForm('signup-form');
    await Helpers.submitForm('signup-form');
    expect(screen.getByTestId('create-btn')).toBeDisabled();
    expect(remoteSignupSpy.callsCount).toBe(1);
  });

  it('Should render error in case of remoteSignup.create fails', async () => {
    const { remoteSignupSpy } = createSut({
      populateForm: true,
    });
    const error = new EmailInUseError();
    jest.spyOn(remoteSignupSpy, 'create').mockRejectedValueOnce(error);
    await Helpers.submitForm('signup-form');
    Helpers.testErrorContainer('error-msg', error.message);
  });

  it('Should call storeLoginAccountMock.store with correct accessToken and redirect to /', async () => {
    const { remoteSignupSpy, setLoginAccount } = createSut();
    await Helpers.submitForm('signup-form');
    expect(setLoginAccount).toHaveBeenCalledWith(remoteSignupSpy.account);
    expect(history.location.pathname).toBe('/');
  });

  it('Should render error if storeLoginAccountMock.store fails', async () => {
    const { setLoginAccount } = createSut();
    const error = new Error('error');
    setLoginAccount.mockImplementationOnce(() => {
      throw error;
    });
    await Helpers.submitForm('signup-form');
    Helpers.testErrorContainer('error-msg', error.message);
  });

  it('Should redirect to login if login link is clicked', () => {
    createSut();
    const link = screen.getByTestId('login-link');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/login');
  });
});
