import React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import Layout from '../../hoc/Layout/main';
import { MT_5 } from '../../shared/strings';
import { Heading } from '../../components/Common';

const About = props => (
  <Layout {...props}>
    <Container>
      <Heading className={`${MT_5} text-${props.color}`}>About</Heading>
      <div className={`text-${props.color}`}>
        MERN: MongoDB, Express.js, React.js + hooks, Node.js
      </div>
    </Container>
  </Layout>
);

const mapStateToProps = state => {
  const { color } = state.color;
  return { color };
};

export default connect(mapStateToProps)(About);
