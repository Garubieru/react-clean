import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { RemoteSignupSpy, ValidationStub, Helpers } from '@/presentation/test';

import Signup from '.';
import { RequiredFieldError } from '@/presentation/validation/errors';
import { mockAccountCreation } from '@/domain/test';
import { AccountParams } from '@/domain/usecases';
import { EmailInUseError } from '@/domain/errors';
import { ApiContext } from '@/presentation/context/api/api-context';
import { AccountModel } from '@/domain/models';

type SutType = {
  sut: RenderResult;
  validationStub: ValidationStub;
  remoteSignupSpy: RemoteSignupSpy;
  setLoginAccount: jest.Mock<void, [AccountModel]>;
};

type SutParams = {
  withError?: boolean;
  populateForm?: boolean;
  formParams?: AccountParams;
};

const history = createMemoryHistory({ initialEntries: ['/signin'] });
const createSut = (params?: SutParams): SutType => {
  const validationStub = new ValidationStub();
  const remoteSignupSpy = new RemoteSignupSpy();
  const setLoginAccount = jest.fn();
  if (params?.withError) validationStub.errorMessage = new RequiredFieldError().message;
  const sut = render(
    <ApiContext.Provider value={{ setLoginAccount }}>
      <Router location={history.location} navigator={history}>
        <Signup validations={validationStub} remoteSignup={remoteSignupSpy} />
      </Router>
    </ApiContext.Provider>,
  );
  if (params?.populateForm) populateForm(sut, params?.formParams);
  return {
    sut,
    validationStub,
    remoteSignupSpy,
    setLoginAccount,
  };
};

const populateForm = (sut: RenderResult, params = mockAccountCreation()): void => {
  Helpers.populateField(sut, 'name', params.name);
  Helpers.populateField(sut, 'email', params.email);
  Helpers.populateField(sut, 'password', params.password);
  Helpers.populateField(sut, 'passwordConfirmation', params.passwordConfirmation);
};

describe('Signup Component', () => {
  afterEach(() => cleanup());

  it('Should render with initial state and throw error when validation fails', () => {
    const { sut, validationStub } = createSut({ withError: true });
    Helpers.testFieldStatus(sut, 'name', validationStub.errorMessage);
    Helpers.testFieldStatus(sut, 'email', validationStub.errorMessage);
    Helpers.testFieldStatus(sut, 'password', validationStub.errorMessage);
    Helpers.testFieldStatus(sut, 'passwordConfirmation', validationStub.errorMessage);
    Helpers.testButtonStatus(sut, 'create-btn', 'disabled');
    Helpers.testErrorContainer(sut, 'error-msg', '');
  });

  it('Should show name error if validations throws error', () => {
    const { sut, validationStub } = createSut({ withError: true });
    Helpers.populateField(sut, 'name');
    Helpers.testFieldStatus(sut, 'name', validationStub.errorMessage);
  });

  it('Should show email error if validations throws error', () => {
    const { sut, validationStub } = createSut({ withError: true });
    Helpers.populateField(sut, 'email');
    Helpers.testFieldStatus(sut, 'email', validationStub.errorMessage);
  });

  it('Should show name error if validations throws error', () => {
    const { sut, validationStub } = createSut({ withError: true });
    Helpers.populateField(sut, 'password');
    Helpers.testFieldStatus(sut, 'password', validationStub.errorMessage);
  });

  it('Should show name error if validations throws error', () => {
    const { sut, validationStub } = createSut({ withError: true });
    Helpers.populateField(sut, 'passwordConfirmation');
    Helpers.testFieldStatus(sut, 'passwordConfirmation', validationStub.errorMessage);
  });

  it('Should button be enabled when form has no errors', () => {
    const { sut } = createSut({ withError: false });
    Helpers.testButtonStatus(sut, 'create-btn', 'enabled');
  });

  it('Should show spinner when form is submitting', async () => {
    const { sut } = createSut();
    await Helpers.submitForm(sut, 'signup-form');
    Helpers.testElementIsRendered(sut, 'spinner');
  });

  it('Should call remoteSignup.create with correct params', async () => {
    const params = mockAccountCreation();
    const { sut, remoteSignupSpy } = createSut({
      populateForm: true,
      formParams: params,
    });
    await Helpers.submitForm(sut, 'signup-form');
    expect(remoteSignupSpy.params).toEqual(params);
  });

  it('Should not call remoteSignup.create if form is invalid', async () => {
    const { sut, remoteSignupSpy } = createSut({
      populateForm: true,
      withError: true,
    });
    await Helpers.submitForm(sut, 'signup-form');
    expect(remoteSignupSpy.callsCount).toBe(0);
  });

  it('Should form and button be disabled while form is submitting', async () => {
    const { sut, remoteSignupSpy } = createSut({
      populateForm: true,
    });
    await Helpers.submitForm(sut, 'signup-form');
    await Helpers.submitForm(sut, 'signup-form');
    Helpers.testButtonStatus(sut, 'create-btn', 'disabled');
    expect(remoteSignupSpy.callsCount).toBe(1);
  });

  it('Should render error in case of remoteSignup.create fails', async () => {
    const { sut, remoteSignupSpy } = createSut({
      populateForm: true,
    });
    const error = new EmailInUseError();
    jest.spyOn(remoteSignupSpy, 'create').mockRejectedValueOnce(error);
    await Helpers.submitForm(sut, 'signup-form');
    Helpers.testErrorContainer(sut, 'error-msg', error.message);
  });

  it('Should call storeLoginAccountMock.store with correct accessToken and redirect to /', async () => {
    const { sut, remoteSignupSpy, setLoginAccount } = createSut();
    await Helpers.submitForm(sut, 'signup-form');
    expect(setLoginAccount).toHaveBeenCalledWith(remoteSignupSpy.account);
    expect(history.location.pathname).toBe('/');
  });

  it('Should render error if storeLoginAccountMock.store fails', async () => {
    const { sut, setLoginAccount } = createSut();
    const error = new Error('error');
    setLoginAccount.mockImplementationOnce(() => {
      throw error;
    });
    await Helpers.submitForm(sut, 'signup-form');
    Helpers.testErrorContainer(sut, 'error-msg', error.message);
  });

  it('Should redirect to login if login link is clicked', () => {
    const { sut } = createSut();
    const link = sut.getByTestId('login-link');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/login');
  });
});
