import React from 'react';
import { connect } from 'react-redux';

import Layout from '../../hoc/Layout/main';
import { MT_5 } from '../../shared/strings';
import { Heading } from '../../components/Common';
import { doLogin } from '../../store/actions';

const Signin = props => {
  // ### TODO Error reducer ###
  const { color, loading, user, doLogin } = props;

  return (
    <Layout {...props}>
      <Heading className={`${MT_5} text-${color}`}>SignIn</Heading>
    </Layout>
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
)(Signin);
