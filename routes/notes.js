const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

const notesRouter = express.Router();

notesRouter.get('/', async (req, res) => {
  try {
    const data = await readFromFile('./db/db.json');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

notesRouter.get('/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await readFromFile('./db/db.json');
    const json = JSON.parse(data);
    const result = json.filter((note) => note.id === noteId);
    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).json('No Note with that ID');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

notesRouter.post('/', async (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      id: uuidv4(),
      title,
      text,
    };

    try {
      await readAndAppend(newNote, './db/db.json');
      res.json('Note added successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(400).json('Please provide a title and text for the note');
  }
});

notesRouter.delete('/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await readFromFile('./db/db.json');
    const json = JSON.parse(data);
    const result = json.filter((note) => note.id !== noteId);
    await writeToFile('./db/db.json', result);
    res.json(`Note with Note ID ${noteId} has been deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = notesRouter;