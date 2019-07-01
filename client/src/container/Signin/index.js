import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import Layout from '../../hoc/Layout/main';
import { doLogin } from '../../store/actions';
import { getNewControls } from '../../shared/utils';
import { MT_5, HOME_LINK, SIGNUP_LINK } from '../../shared/strings';
import {
  Heading,
  SpinnerDefault,
  FrmGrp,
  RouterLink
} from '../../components/Common';

const Signup = props => {
  const [disabled, setDisabled] = useState(true);
  const [controls, setControls] = useState({
    email: {
      value: '',
      valid: false,
      touch: false,
      errMsg: '',
      validationRules: {
        isEmail: true,
        required: true,
        maxLength: 50
      }
    },
    password: {
      value: '',
      valid: false,
      touch: false,
      errMsg: '',
      validationRules: {
        required: true,
        maxLength: 50
      }
    }
  });
  const { email, password } = controls;
  const { color, loading, user, doLogin } = props;

  const onChangeHandler = e => {
    const { id, value } = e.target;

    let newControls = { ...controls };
    newControls[id].value = value;
    newControls = getNewControls({ id, value, newControls });
    setControls(newControls);

    const { email, password } = newControls;
    setDisabled(!email.valid || !password.valid);
  };

  const onSigninHandler = () => {
    doLogin({
      email: email.value,
      password: password.value
    });
  };

  const renderFormContent = () => {
    return (
      <Fragment>
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
        <div className={'text-right'}>
          <small>
            Not registered?{' '}
            <RouterLink className={`text-${color}`} to={SIGNUP_LINK}>
              SignUp
            </RouterLink>
          </small>
        </div>
      </Fragment>
    );
  };

  const renderButton = () => {
    if (loading) return <SpinnerDefault className={'mt-3'} color={color} />;
    return (
      <Button
        className={'mt-3'}
        onClick={onSigninHandler}
        disabled={disabled}
        color={color}
      >
        SignIn
      </Button>
    );
  };

  const renderRedirect = () => {
    if (user) return <Redirect to={{ pathname: HOME_LINK }} />;
  };

  return (
    <Fragment>
      {renderRedirect()}
      <Layout {...props}>
        <Heading className={`${MT_5} text-${color}`}>SignIn</Heading>
        <div className="w-50">
          <Form className={MT_5} autoComplete={'off'}>
            {renderFormContent()}
            {renderButton()}
          </Form>
        </div>
      </Layout>
    </Fragment>
  );
};

const mapStateToProps = state => {
  const { color } = state.color;
  const { loading, user } = state.auth;
  return { color, loading, user };
};

export default connect(
  mapStateToProps,
  { doLogin }
)(Signup);
