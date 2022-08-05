const checkEmail = (email) => {
  return /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email);
};

const checkFields = (data) => {
  for (const key of Object.keys(data)) {
    if (data[key].toString().trim() === "") {
      return false;
    }
  }
  return true;
};

const checkJustDigits = (salary) => {
  for (const digit of salary) {
    if (!/[0-9]/.test(digit)) {
      return false;
    }
  }
  return true;
};

const checkPassword = (password) => {
  return !password.includes(" ");
};

const checkJustLetters = (value = "") => {
  return (
    [...value].every((character) => /[a-zA-Z]/.test(character)) &&
    value.length > 0
  );
};

export {
  checkEmail,
  checkFields,
  checkJustDigits,
  checkPassword,
  checkJustLetters,
};
