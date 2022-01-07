import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { Login } from '@/presentation/pages';
import { ValidationComposite } from '@/presentation/validation/validators';
import { ValidationBuilder } from '@/presentation/validation/validators/builder/validation-builder';
import React from 'react';

export const createLogin: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login';
  const axioxHttpPostClient = new AxiosHttpClient();
  const remouteAuthentication = new RemoteAuthentication(url, axioxHttpPostClient);

  const validationComposite = ValidationComposite.build({
    email: ValidationBuilder.field().required().isEmail().build(),
    password: ValidationBuilder.field().required().build(),
  });

  return (
    <Login authentication={remouteAuthentication} validation={validationComposite} />
  );
};
