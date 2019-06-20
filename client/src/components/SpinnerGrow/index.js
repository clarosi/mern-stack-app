import React from 'react';
import { Spinner } from 'reactstrap';

export const SpinnerGrow = props => {
  const type = 'grow';
  return (
    <div>
      <Spinner {...props} type={type} color="primary" />
      <Spinner {...props} type={type} color="secondary" />
      <Spinner {...props} type={type} color="success" />
      <Spinner {...props} type={type} color="danger" />
      <Spinner {...props} type={type} color="warning" />
      <Spinner {...props} type={type} color="info" />
      <Spinner {...props} type={type} color="light" />
      <Spinner {...props} type={type} color="dark" />
    </div>
  );
};
