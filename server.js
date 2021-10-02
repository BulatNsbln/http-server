// @ts-check
/* eslint-disable no-console */

import http from 'http';

export default (usersById) => http.createServer((request, response) => {
  request.on('error', (err) => {
    console.error(err.stack);
  });
  request.on('end', () => {
    if (request.url === '/') {
      const messages = [
        'Welcome to The Phonebook',
        `Records count: ${Object.keys(usersById).length}`,
      ];
      response.end(messages.join('\n'));
    } else if (request.url.startsWith('/search.json')) {
      response.setHeader('Content-Type', 'application/json');

      const url = new URL(request.url, `http://${request.headers.host}`);
      const q = url.searchParams.get('q');
      const normalizedSearch = q ? q.trim().toLowerCase() : '';

      const result = Object.values(usersById)
        .filter((user) => user.name.toLowerCase().includes(normalizedSearch));

      response.end(JSON.stringify(result));
    } else if (request.url.startsWith('/users.json')) {
      // BEGIN (write your solution here)
      const url = new URL(request.url, `http://${request.headers.host}`);

      const page = +(url.searchParams.get('page') ?? 1);
      const perPage = +(url.searchParams.get('perPage') ?? 10);
      const users = Object.values(usersById);
      const totalPages = Math.ceil(users.length / perPage);

      const meta = {
        page,
        perPage,
        totalPages,
      };

      const end = page * perPage;
      const start = end - perPage;
      const data = users
        .slice(start, end);

      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({
        meta,
        data,
      }));
      // END
    }
  });
  request.resume();
});
