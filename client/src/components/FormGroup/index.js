import React from 'react';
import { FormGroup, Label, FormFeedback } from 'reactstrap';

import { Textbox } from '../Common';

export const FrmGrp = ({ id, lblTxt, control, type, onChange }) => (
  <FormGroup>
    <Label for={id}>{lblTxt}:</Label>
    <Textbox
      id={id}
      value={control.value}
      type={type}
      // placeholder={`Enter ${id}`}
      invalid={!control.valid && control.touch}
      valid={control.valid && control.touch}
      onChange={e => onChange(e)}
    />
    <FormFeedback>{control.errMsg}</FormFeedback>
  </FormGroup>
);
