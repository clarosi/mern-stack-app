import { validate, manageValidation } from './index';

export const getNewControls = (id, value, newControls) => {
  const connectedValue = manageValidation(id, value, newControls);
  newControls = {
    ...newControls,
    [id]: {
      ...newControls[id],
      value,
      valid: validate(value, newControls[id].validationRules, connectedValue),
      touch: true
    }
  };
  return newControls;
};

export const resetControls = controls => {
  const newControls = { ...controls };
  for (const key in newControls) {
    newControls[key].value = '';
    newControls[key].valid = false;
    newControls[key].touch = false;
  }
  return newControls;
};
