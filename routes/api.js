const express = require('express');
const notesRouter = require('./notes.js');

const api = express();
api.use('/notes', notesRouter);

module.exports = api;