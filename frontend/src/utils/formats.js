const timeFormat = (value) => {
  const toNumber = parseInt(value);
  return toNumber < 10 ? `0${value}` : value;
};

const dateFromCode = (code) => {
  const parts = code.split(".");
  return `${parts[2]}/${parts[1]}/${parts[3]}`;
};

export { timeFormat, dateFromCode };
