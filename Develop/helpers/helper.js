const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

function read() {
    return readFileAsync('./db/db.json', 'utf8');
}

async function getNote() {
    const note = await read().then((data) => {
       // console.log(JSON.parse(data));
        return JSON.parse(data);
    })
    return note;
}

async function addNote(newNote) {
    const notes = await getNote()
    console.log(notes, 'helper');
   
            notes.push(newNote);
            const notesStr = JSON.stringify(notes);
            writeFileAsync('./db/db.json', notesStr, (err) => { 
                if (err) {
                    throw new Error(err);
                } else {
                    return;
                }
            });
            return notesStr;
}

async function deleteNote(deletedNote) {
    const notes = await getNote();
    console.log(notes);
    const modifiedNote = notes.filter(note => {
        return note.id != deletedNote;
    });
    const notesStr = JSON.stringify(modifiedNote);
    writeFileAsync('./db/db.json', notesStr, (err) => { 
        if (err) {
            throw new Error(err);
        } else {
            return;
        }
    });
    return modifiedNote;
}

module.exports = {addNote, getNote, deleteNote};