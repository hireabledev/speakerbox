import { config as debug } from 'lib/debug';

export const transforms = {
  identity(value) {
    return value;
  },
  boolean(value) {
    if (value === 'false') {
      return false;
    }
    return Boolean(value);
  },
  integer(value) {
    try {
      const result = parseInt(value, 10);
      if (isNaN(result)) {
        return value;
      }
      return result;
    } catch (err) {
      return value;
    }
  },
  number(value) {
    try {
      const result = parseFloat(value);
      if (isNaN(result)) {
        return value;
      }
      return value;
    } catch (err) {
      return value;
    }
  },
  json(value) {
    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
  },
};

export default function env(options) {
  const {
    name,
    defaultValue,
    required = false,
    transform = transforms.identity,
  } = options;

  const value = transform(process.env[name]);

  if (required && (value === undefined || value === null)) {
    throw new Error(`${name} env variable is required.`);
  }

  const result = (value !== undefined ? value : defaultValue);

  if (result === undefined || result === null) {
    debug.warn(`Optional env variable ${name} is ${result}.`);
  }

  return result;
}
