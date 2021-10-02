// @ts-check

import axios from 'axios';

import server from '../index.js';

const hostname = 'localhost';
const port = 9000;
const base = `http://${hostname}:${port}`;

describe('Phonebook', () => {
  it('/', () => (
    new Promise((resolve, reject) => {
      server(port, async (s) => {
        try {
          const res = await axios.get(base);
          expect(res.data).toBe('Welcome to The Phonebook\nRecords count: 1000');
          resolve();
        } catch (e) {
          reject(e);
        } finally {
          s.close();
        }
      });
    })
  ));

  it('/users/<id>', () => {
    const result = {
      data: {
        name: 'Mrs. Marlee Lesch',
        phone: '(412) 979-7311',
      },
    };

    return new Promise((resolve, reject) => {
      server(port, async (s) => {
        try {
          const url = new URL('/users/9.json', base);
          const res = await axios.get(url.toString());
          expect(res.status).toBe(200);
          expect(res.data).toEqual(result);
          resolve();
        } catch (e) {
          reject(e);
        } finally {
          s.close();
        }
      });
    });
  });

  it('/users/<undefined>', () => (
    new Promise((resolve, reject) => {
      server(port, async (s) => {
        try {
          const url = new URL('/users/10000.json', base);
          const res = await axios.get(url.toString(), { validateStatus: () => true });
          expect(res.status).toBe(404);
          resolve();
        } catch (e) {
          reject(e);
        } finally {
          s.close();
        }
      });
    })
  ));
});
