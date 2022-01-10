import React from 'react';
import Styles from './styles.scss';
import { Input, Button, Link, Error, PageWrapper, Form } from '@/presentation/components';
import { FormContext } from '@/presentation/context/form/form-context';

const Signup: React.FC = () => {
  return (
    <PageWrapper>
      <div className={Styles.signupContainer}>
        <FormContext.Provider value={{ state: {} }}>
          <Form title="Signup">
            <Input name="name" type="text" placeholder="Name" />
            <Input name="email" type="email" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
            <Input
              name="passwordConfirmation"
              type="password"
              placeholder="Repeat your password"
            />
            <Button type="submit">Create</Button>
            <Error />
            <Link to="/login">Back to Signin</Link>
          </Form>
        </FormContext.Provider>
      </div>
    </PageWrapper>
  );
};

export default Signup;
