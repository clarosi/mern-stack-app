export const manageValidation = ({ key, value, controls }) => {
  let connectedValue = {};
  if (controls[key].validationRules.equalTo) {
    const equalControl = controls[key].validationRules.equalTo;
    const equalValue = controls[equalControl].value;
    connectedValue = {
      ...connectedValue,
      equalTo: equalValue
    };
  }
  if (key === 'password') {
    connectedValue = {
      ...connectedValue,
      equalTo: value
    };
  }
  return connectedValue;
};
