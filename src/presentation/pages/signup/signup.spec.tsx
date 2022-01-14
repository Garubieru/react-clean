import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  RemoteSignupSpy,
  ValidationStub,
  Helpers,
  StoreAccessTokenMock,
} from '@/presentation/test';

import Signup from '.';
import { RequiredFieldError } from '@/presentation/validation/errors';
import { mockAccountCreation } from '@/domain/test';
import { AccountParams } from '@/domain/usecases';
import { EmailInUseError } from '@/domain/errors';

type SutType = {
  sut: RenderResult;
  validationStub: ValidationStub;
  remoteSignupSpy: RemoteSignupSpy;
  storeAccessTokenMock: StoreAccessTokenMock;
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
  const storeAccessTokenMock = new StoreAccessTokenMock();
  if (params?.withError) validationStub.errorMessage = new RequiredFieldError().message;
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Signup
        validations={validationStub}
        remoteSignup={remoteSignupSpy}
        storeAccessToken={storeAccessTokenMock}
      />
    </Router>,
  );
  if (params?.populateForm) populateForm(sut, params?.formParams);
  return {
    sut,
    validationStub,
    remoteSignupSpy,
    storeAccessTokenMock,
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
    await Helpers.submitForm(sut, 'create-form');
    Helpers.testElementIsRendered(sut, 'spinner');
  });

  it('Should call remoteSignup.create with correct params', async () => {
    const params = mockAccountCreation();
    const { sut, remoteSignupSpy } = createSut({
      populateForm: true,
      formParams: params,
    });
    await Helpers.submitForm(sut, 'create-form');
    expect(remoteSignupSpy.params).toEqual(params);
  });

  it('Should not call remoteSignup.create if form is invalid', async () => {
    const { sut, remoteSignupSpy } = createSut({
      populateForm: true,
      withError: true,
    });
    await Helpers.submitForm(sut, 'create-form');
    expect(remoteSignupSpy.callsCount).toBe(0);
  });

  it('Should form and button be disabled while form is submitting', async () => {
    const { sut, remoteSignupSpy } = createSut({
      populateForm: true,
    });
    await Helpers.submitForm(sut, 'create-form');
    await Helpers.submitForm(sut, 'create-form');
    Helpers.testButtonStatus(sut, 'create-btn', 'disabled');
    expect(remoteSignupSpy.callsCount).toBe(1);
  });

  it('Should render error in case of remoteSignup.create fails', async () => {
    const { sut, remoteSignupSpy } = createSut({
      populateForm: true,
    });
    const error = new EmailInUseError();
    jest.spyOn(remoteSignupSpy, 'create').mockRejectedValueOnce(error);
    await Helpers.submitForm(sut, 'create-form');
    Helpers.testErrorContainer(sut, 'error-msg', error.message);
  });

  it('Should call storeAccessToken.store with correct accessToken and redirect to /', async () => {
    const { sut, remoteSignupSpy, storeAccessTokenMock } = createSut();
    await Helpers.submitForm(sut, 'create-form');
    expect(storeAccessTokenMock.accessToken).toBe(remoteSignupSpy.account.accessToken);
    expect(history.location.pathname).toBe('/');
  });

  it('Should render error if storeAccessToken.store fails', async () => {
    const { sut, storeAccessTokenMock } = createSut();
    const error = new Error('error');
    jest.spyOn(storeAccessTokenMock, 'store').mockRejectedValue(error);
    await Helpers.submitForm(sut, 'create-form');
    Helpers.testErrorContainer(sut, 'error-msg', error.message);
  });

  it('Should redirect to login if login link is clicked', () => {
    const { sut } = createSut();
    const link = sut.getByTestId('login-link');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/login');
  });
});
