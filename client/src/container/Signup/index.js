import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import Layout from '../../hoc/Layout/main';
import { doSignup } from '../../store/actions';
import { getNewControls } from '../../shared/utils';
import { MT_5, HOME_LINK } from '../../shared/strings';
import { Heading, SpinnerDefault, FrmGrp } from '../../components/Common';

const Signup = props => {
  const [disabled, setDisabled] = useState(true);
  const [controls, setControls] = useState({
    name: {
      value: '',
      valid: false,
      touch: false,
      errMsg: '',
      validationRules: {
        minLength: 3,
        required: true,
        maxLength: 20
      }
    },
    email: {
      value: '',
      valid: false,
      touch: false,
      errMsg: '',
      validationRules: {
        isEmail: true,
        //minLength: 5,
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
        minLength: 6,
        required: true,
        maxLength: 50
      }
    },
    confirmPassword: {
      value: '',
      valid: false,
      touch: false,
      errMsg: '',
      validationRules: {
        equalTo: 'password',
        //minLength: 6,
        required: true,
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
      <Fragment>
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
      </Fragment>
    );
  };

  const renderButton = () => {
    if (loading) return <SpinnerDefault className={'mt-3'} color={color} />;
    return (
      <Button
        className={'mt-3'}
        onClick={onSignupHandler}
        disabled={disabled}
        color={color}
      >
        SignUp
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
        <Heading className={`${MT_5} text-${color}`}>SignUp</Heading>
        <div className="w-50 mb-5">
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
  { doSignup }
)(Signup);
