import fs from 'fs/promises';
import _ from 'lodash';

import makeServer from './server.js';

export default async (port, callback = () => {}) => {
  const data = await fs.readFile('phonebook.txt', 'utf-8');

  // BEGIN (write your solution here)
  const userList = data
    .toString()
    .trim()
    .split('\n')
    .map((item) => {
      const [id, name, phone] = item
        .split('|')
        .map(item => item.trim());
      return {
        id,
        name,
        phone,
      }
    });
  const usersById = userList
    .reduce((acc, { id, name, phone }) => {
      const newValue = {...acc};
      newValue[id] = {
        name,
        phone,
      };
      return newValue;
    }, {});
  // END

  const server = makeServer(usersById);
  server.listen(port, () => callback(server));
};
