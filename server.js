// @ts-check
import fs from 'fs/promises';
import http from 'http';

export default async (port, callback) => {
  // BEGIN (write your solution here)
  const server = http.createServer(async (_request, response) => {
    const phoneBook = await fs.readFile('./phonebook.txt');
    const recordsCount = phoneBook
      .toString()
      .trim()
      .split('\n')
      .length;

    const message = `Welcome to The Phonebook\nRecords count: ${recordsCount}`;
    response.end(message);
  });

  server.listen(port, callback);
  // END
};
