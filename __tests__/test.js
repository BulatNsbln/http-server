import axios from 'axios';

import startServer from '../index.js';

const hostname = 'http://localhost';
const port = 9000;
const base = `${hostname}:${port}`;

describe('Phonebook', () => {
  let server;

  describe('Server', () => {
    afterEach(() => {
      server.close();
    });

    it('GET /', () => (
      new Promise((resolve, reject) => {
        startServer(port, async (s) => {
          server = s;
          try {
            const res = await axios.get(base);
            expect(res.data).toBe('Welcome to The Phonebook\nRecords count: 1000');
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      })
    ));

    it('GET /search?q=<substr>', () => {
      const expected = `
Miss Lindsey Hermann, 1-559-706-3580
Miss Herman Orn, 988-099-6371
Ms. Liana Herman, (422) 346-7454
Herman Oberbrunner, 315-607-3728`;

      return new Promise((resolve, reject) => {
        startServer(port, async (s) => {
          server = s;
          const url = new URL('/search', base);
          url.searchParams.set('q', 'HermaN');
          try {
            const res = await axios.get(url.toString());
            expect(res.data).toBe(expected.trim());
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
    });

    it('GET /search?q=<substr> 2', () => {
      const expected = `
Lilliana Conn, 1-484-608-2239
Ms. Liana Herman, (422) 346-7454`;

      return new Promise((resolve, reject) => {
        startServer(port, async (s) => {
          server = s;
          const url = new URL('/search', base);
          url.searchParams.set('q', 'LIANA');
          try {
            const res = await axios.get(url.toString());
            expect(res.data).toBe(expected.trim());
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
    });

    it('GET /search?q=<undefined>', () => {
      const expected = '';

      return new Promise((resolve, reject) => {
        startServer(port, async (s) => {
          server = s;
          const url = new URL('/search', base);
          url.searchParams.set('q', 'AAsdf2');
          try {
            const res = await axios.get(url.toString());
            expect(res.data).toBe(expected.trim());
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
    });

    it('GET /search', () => {
      const expected = '';

      return new Promise((resolve, reject) => {
        startServer(port, async (s) => {
          server = s;
          const url = new URL('/search', base);
          try {
            const res = await axios.get(url.toString());
            expect(res.data).toBe(expected);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
    });
  });
});
