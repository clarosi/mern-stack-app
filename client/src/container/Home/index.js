import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import { Heading } from '../../components/Common';
import Layout from '../../hoc/Layout/main';
import ItemList from '../../components/ItemList';

const Home = props => {
  return (
    <Layout>
      <Container>
        <Heading className={`text-${props.color} mt-3`}>Home</Heading>
        <ItemList />
      </Container>
    </Layout>
  );
};

const mapStateToProps = state => {
  const { color } = state.color;
  return { color };
};

export default connect(mapStateToProps)(Home);
