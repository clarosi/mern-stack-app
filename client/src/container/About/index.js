import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';

import Layout from '../../hoc/Layout/main';
import { MT_5 } from '../../shared/strings';
import { Heading } from '../../components/Common';

const About = props => {
  const dependencies = [
    'axios',
    'redux',
    'redux-thunk',
    'react-redux',
    'react-router',
    'react-router-dom',
    'bootstrap',
    'reactstrap',
    'font-awesome',
    '@material-ui/core',
    '@material-ui/icons',
    'react-transition-group'
  ];

  const renderListGroupItem = () =>
    dependencies.map((item, idx) => (
      <ListGroupItem key={idx}>{item}</ListGroupItem>
    ));

  return (
    <Layout {...props}>
      <Heading className={`${MT_5} text-${props.color}`}>About</Heading>
      <div>
        MERN STACK APP: MongoDB, Express.js, React.js + hooks, Node.js
        <div className={`w-75 mb-5 ${MT_5}`}>
          <h4>Dependecies</h4>
          <ListGroup>{renderListGroupItem()}</ListGroup>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => {
  const { color } = state.color;
  return { color };
};

export default connect(mapStateToProps)(About);
