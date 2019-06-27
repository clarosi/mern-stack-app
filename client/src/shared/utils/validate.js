const emailValidator = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const requireValidator = (value, required) =>
  required ? value.trim().length > 0 : !required;

const minLengthValidator = (value, minLength) =>
  value.trim().length >= minLength;

const maxLengthValidator = (value, maxLength) =>
  value.trim().length <= maxLength;

const equalToValidator = (value, checkValue) => value === checkValue;

export const validate = ({ value, rules, connectedValue }) => {
  let msg = '';
  let result = [true, ''];

  for (const rule in rules) {
    switch (rule) {
      case 'required':
        const valid1 = requireValidator(value, rules[rule]);
        msg = `${!valid1 ? 'This field is required.' : ''}`;
        result = !valid1 ? [valid1, msg] : result;
        break;
      case 'isEmail':
        const valid2 = emailValidator(value);
        msg = `${!valid2 ? 'Please enter a valid email.' : ''}`;
        result = !valid2 ? [valid2, msg] : result;
        break;
      case 'minLength':
        const valid3 = minLengthValidator(value, rules[rule]);
        msg = `${!valid3 ? `Minimum length is ${rules[rule]}.` : ''}`;
        result = !valid3 ? [valid3, msg] : result;
        break;
      case 'maxLength':
        const valid4 = maxLengthValidator(value, rules[rule]);
        msg = `${!valid4 ? `Maximum length is ${rules[rule]}.` : ''}`;
        result = !valid4 ? [valid4, msg] : result;
        break;
      case 'equalTo':
        const valid5 = equalToValidator(value, connectedValue[rule]);
        msg = `${!valid5 ? 'Not match.' : ''}`;
        result = !valid5 ? [valid5, msg] : result;
        break;
      default:
        break;
    }
  }
  return result;
};
