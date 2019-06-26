import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, Label } from 'reactstrap';

import { Textbox } from '../Common';

const FrmGrp = ({ id, lblTxt, color, control, type, onChange }) => (
  <FormGroup>
    <Label for={id} className={`text-${color}`}>
      {lblTxt}:
    </Label>
    <Textbox
      id={id}
      value={control.value}
      type={type}
      // placeholder={`Enter ${id}`}
      invalid={!control.valid && control.touch}
      onChange={e => onChange(e)}
    />
  </FormGroup>
);

const mapStateToProps = state => {
  const { color } = state.color;
  return { color };
};

export default connect(mapStateToProps)(FrmGrp);
