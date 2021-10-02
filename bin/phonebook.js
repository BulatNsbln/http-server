#!/usr/bin/env babel-node
// @ts-check
import solution from '../server.js';

const port = 8080;
solution(port, () => {
  // eslint-disable-next-line no-console
  console.log('server started!');
});
