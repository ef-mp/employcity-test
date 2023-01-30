import express from 'express'
import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {App} from "../components/App/App";
import es6Promise from 'es6-promise'
import fetch from 'fetch-everywhere'
import nodeWindowPolyfill from "node-window-polyfill";
let window: any = {}


if (typeof window?.setInterval === 'undefined') {
  nodeWindowPolyfill.register();
}

es6Promise.polyfill()


window.fetch = fetch


const PORT = process.env.SERVER_PORT || 3001;
const server = express();

server.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(React.createElement(App))
  const indexFile = path.resolve('./build/index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Ошибка загрузки index.html');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  })
})

server.use(express.static('./build'));

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});