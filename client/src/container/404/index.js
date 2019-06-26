import React from 'react';
import { connect } from 'react-redux';

import Layout from '../../hoc/Layout/main';
import { MT_5 } from '../../shared/strings';
import { Heading } from '../../components/Common';

const NotFound = props => (
  <Layout {...props}>
    <Heading className={`${MT_5} text-${props.color}`}>Page Not Found.</Heading>
  </Layout>
);

const mapStateToProps = state => {
  const { color } = state.color;
  return { color };
};

export default connect(mapStateToProps)(NotFound);
