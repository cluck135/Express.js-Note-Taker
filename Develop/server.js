const express = require('express');
const path = require('path');

const helper = require('./helpers/helper');
const notes = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', async (req, res) => {
  console.info(`GET /api/reviews`);
  let note = await helper.getNote();
  res.status(200).json(note);
});

app.post('/api/notes', async (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text, id} = req.body;
  
  if (title && text && id) {

    const newNote = {
      title,
      text,
      id,
    }
    let response = await helper.addNote(newNote)// .then( send ) and .catch
    console.log(response, 'serverjs');
    res.status(201).json(response);// might need to remove the .json(response since it is not needed technically)
  } else {
    console.log(response);
  }
});

app.delete('/api/notes/:id', async (req, res) => {
  console.log(`${req.method} request received to add to a note`);
  const noteToDelete = req.params.id;
  let response = await helper.deleteNote(noteToDelete);
  console.log(response, 'serverjsdelete');
  res.status(201).json(response);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
