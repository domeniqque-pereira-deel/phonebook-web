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

export const formatPhoneNumber = (number) => {
  const mask = 'XXXXX-XXXX';

  const s = String(number);
  let result = '';

  for (let im = 0, is = 0; im < mask.length && is < s.length; im++) {
    result += mask.charAt(im) === 'X' ? s.charAt(is++) : mask.charAt(im);
  }

  return result;
};

export const generatePhoneSequence = (startSequenceMasked, qtdSequence) => {
  const sequence = [];

  const [prefix, number] = startSequenceMasked.split(' ');
  const firstNumber = Number(number.replace('-', ''));

  for (let index = 0; index < qtdSequence; index++) {
    const createdNumber = formatPhoneNumber(firstNumber + index);

    sequence.push(`${prefix} ${createdNumber}`);
  }

  return sequence;
};
