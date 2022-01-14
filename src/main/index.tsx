import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@/presentation/components';
import '@/presentation/styles/global.scss';
import { createLogin, createSignup } from '@/main/factories/pages';

ReactDOM.render(
  <Router login={createLogin} signup={createSignup} />,
  document.getElementById('main'),
);
