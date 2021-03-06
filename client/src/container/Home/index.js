import React from 'react';
import { connect } from 'react-redux';

import { Heading } from '../../components/Common';
import Layout from '../../hoc/Layout/main';
import ItemList from '../../components/ItemList';
import Modal from '../../components/Modal';

const Home = props => (
  <Layout {...props}>
    <Heading className={`text-${props.color} mt-3`}>Home</Heading>
    <ItemList />
    <Modal />
  </Layout>
);

const mapStateToProps = state => {
  const { color } = state.color;
  return { color };
};

export default connect(mapStateToProps)(Home);
