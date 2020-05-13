export const getValidationErrors = (errors) => {
  return errors.inner.reduce((acc, e) => {
    acc[e.path] = e.message;
    return acc;
  }, {});
};

export const isEmpty = (target) => {
  if (Object.is(target)) return Object.keys(target).length === 0;

  if (typeof target === 'string' || Array.isArray(target))
    return target.length === 0;

  return target === null || target === undefined;
};

export const getFirstSelectValue = (val) => {
  return val && val[0] ? val[0].value : '';
};
