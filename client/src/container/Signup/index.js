import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import Layout from '../../hoc/Layout/main';
import FrmGrp from '../../components/FormGroup';
import { doSignup } from '../../store/actions';
import { getNewControls } from '../../shared/utils';
import { MT_5, HOME_LINK } from '../../shared/strings';
import { Heading, SpinnerDefault } from '../../components/Common';

const Signup = props => {
  const [disabled, setDisabled] = useState(true);
  const [controls, setControls] = useState({
    name: {
      value: '',
      valid: false,
      touch: false,
      validationRules: {
        required: true,
        minLength: 3,
        maxLength: 20
      }
    },
    email: {
      value: '',
      valid: false,
      touch: false,
      validationRules: {
        required: true,
        isEmail: true,
        minLength: 5,
        maxLength: 50
      }
    },
    password: {
      value: '',
      valid: false,
      touch: false,
      validationRules: {
        required: true,
        minLength: 3,
        maxLength: 50
      }
    },
    confirmPassword: {
      value: '',
      valid: false,
      touch: false,
      validationRules: {
        required: true,
        equalTo: 'password',
        minLength: 3,
        maxLength: 50
      }
    }
  });
  const { name, email, password, confirmPassword } = controls;
  const { color, loading, user, doSignup } = props;

  const onChangeHandler = e => {
    const { id, value } = e.target;

    let newControls = { ...controls };
    newControls[id].value = value;
    newControls = getNewControls({ id, value, newControls });
    setControls(newControls);

    const { name, email, password, confirmPassword } = newControls;
    setDisabled(
      !name.valid || !email.valid || !password.valid || !confirmPassword.valid
    );
  };

  const onSignupHandler = () => {
    doSignup({
      name: name.value,
      email: email.value,
      password: password.value
    });
  };

  const renderFormContent = () => {
    return (
      <React.Fragment>
        <FrmGrp
          id={'name'}
          lblTxt={'Name'}
          control={name}
          type={'text'}
          onChange={onChangeHandler}
        />
        <FrmGrp
          id={'email'}
          lblTxt={'Email'}
          control={email}
          type={'email'}
          onChange={onChangeHandler}
        />
        <FrmGrp
          id={'password'}
          lblTxt={'Password'}
          control={password}
          type={'password'}
          onChange={onChangeHandler}
        />
        <FrmGrp
          id={'confirmPassword'}
          lblTxt={'Confirm Password'}
          control={confirmPassword}
          type={'password'}
          onChange={onChangeHandler}
        />
      </React.Fragment>
    );
  };

  const renderButton = () => {
    if (loading) return <SpinnerDefault color={color} />;
    return (
      <Button onClick={onSignupHandler} disabled={disabled} color={color}>
        SignUp
      </Button>
    );
  };

  const renderRedirect = () => {
    if (user) return <Redirect to={{ pathname: HOME_LINK }} />;
  };

  return (
    <React.Fragment>
      {renderRedirect()}
      <Layout {...props}>
        <Heading className={`${MT_5} text-${color}`}>SignUp</Heading>
        <div className="w-50">
          <Form className={MT_5} autoComplete={'off'}>
            {renderFormContent()}
            {renderButton()}
          </Form>
        </div>
      </Layout>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const { color } = state.color;
  const { loading, user } = state.auth;
  return { color, loading, user };
};

export default connect(
  mapStateToProps,
  { doSignup }
)(Signup);
