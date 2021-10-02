import http from 'http';

export default (usersById) => http.createServer((request, response) => {
  request.on('end', () => {
    if (request.url === '/') {
      const messages = [
        'Welcome to The Phonebook',
        `Records count: ${Object.keys(usersById).length}`,
      ];
      response.end(messages.join('\n'));
    } else if (request.url.startsWith('/search')) {
      // BEGIN (write your solution here)
      const url = new URL(request.url, `http://${request.headers.host}`);
      const q = url.searchParams.get('q');
      if (q) {
        const message = Object.values(usersById)
          .filter(({ name }) => name.toLowerCase().includes(q.toLowerCase()))
          .reduce((acc, { name, phone }) => {
            const isNotFirstElement = acc.length > 0;
            return acc + `${isNotFirstElement ? '\n' : ''}${name}, ${phone}`;
          }, '');
        response.end(message);
      } else {
        response.end('');
      }
      // END
    }
  });

  request.resume();
});
