export const enumValidator = ({ name, value, list }) => {
  if (!value) return `${name} can't blank.`;
  if (!list.includes(value)) return `${name} must be ${list.join(' or ')}.`;
};

export const stringValidator = ({ name, value, min, max, not_space }) => {
  if (!value) return `${name} can't blank.`;
  if (min && value.length < min) return `${name} must be at least ${min} characters.`;
  if (max && value.length > max) return `${name} must be at most ${max} characters.`;
  if (not_space && value.includes(' ')) return `${name} must not include space.`;
};

export const booleanValidator = ({ name, value, can_undefined }) => {
  if (!value && can_undefined) return;
  if (typeof value !== 'boolean') return `${name} must be true or false.`;
};

export const arrayValidator = ({ name, value, minLength, fx, ...args }) => {
  if (!value) return `${name}s can't blank.`;
  if (!(typeof value === 'object' && value.length >= 0)) return `${name}s must be array.`;
  if (value.length < minLength) return `${name}s array must be at least ${minLength} length.`;

  if (!fx) return;

  let errors = [];
  value.map(v => errors.push(fx({ name, value: v, ...args })));
  const removeUndefined = errors.filter(e => e !== undefined);
  if (removeUndefined.length > 0) return errors;
};

export const numberValidator = ({ name, value, can_zero }) => {
  if (can_zero && value === 0) return;
  if (!value) return `${name} can't blank.`;
  let number = parseInt(value);
  if (isNaN(number)) return `${name} must be a number`;
};

export const objectValidator = ({ name, value, funs }) => {
  if (!value) return `${name} can't blank.`;
  if (!(typeof value === 'object' && !Array.isArray(value) && value !== null)) return `${name} must be object.`;

  let keys = Object.keys(value);
  if (keys.length === 0) return `${name} can't blank.`;

  let errors = {};
  Object.keys(funs).map(f => {
    let error = funs[f].fun({ name: f, value: value[f], ...funs[f] });
    errors[f] = error;
  });

  if (Object.keys(JSON.parse(JSON.stringify(errors))).length > 0) return errors;
  return undefined;
};

export const timeStampValidator = ({ name, value }) => {
  if (!value) return `${name} can't blank.`;
  value = typeof value === 'string' ? parseInt(value) : value;
  if (isNaN(value)) return `${name} is not date.`;
  if (!(new Date(value).getTime() > 0)) return `${name} is not date.`;
};
