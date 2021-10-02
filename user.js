// @ts-check

let id = 1000;

export const nextId = () => {
  id += 1;
  return id;
};

export const validate = ({ name, phone }) => {
  // BEGIN (write your solution here)
  const errors = [];
  const presenceMessage = "can't be blank";

  if (!phone) {
    errors.push({
      source: 'phone',
      title: presenceMessage,
    });
  }

  if (!name) {
    errors.push({
      source: 'name',
      title: presenceMessage,
    });
  }
  const nameRegExp = /^[\w.]+$/gm;
  if (!nameRegExp.test(name)) {
    errors.push({
      source: 'name',
      title: 'bad format',
    });
  }

  return errors;
  // END
};
