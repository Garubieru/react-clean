import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@/presentation/components';
import '@/presentation/styles/global.scss';
import { createLogin } from './factories/pages/login/login-factory';

ReactDOM.render(<Router CreateLogin={createLogin} />, document.getElementById('main'));
