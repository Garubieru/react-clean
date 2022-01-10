import React from 'react';
import Styles from './styles.scss';
import { Input, Button, Link, Error, PageWrapper } from '@/presentation/components';
import { FormContext } from '@/presentation/context/form/form-context';

const Signup: React.FC = () => {
  return (
    <PageWrapper>
      <div className={Styles.signupContainer}>
        <FormContext.Provider value={{ state: {} }}>
          <form className={Styles.form}>
            <h2>Signup</h2>
            <Input name="name" type="text" placeholder="Name" />
            <Input name="email" type="email" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
            <Input
              name="passwordConfirmation"
              type="password"
              placeholder="Repeat your password"
            />
            <Button type="submit">Login</Button>
            <Error />
            <Link to="/signup">Back to signin</Link>
          </form>
        </FormContext.Provider>
      </div>
    </PageWrapper>
  );
};

export default Signup;
