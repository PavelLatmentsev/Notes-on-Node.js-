const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk")
const notesPath = path.join(__dirname, "./db.json")
async function addNote(title) {
    // const notes = require("./db.json")
    // const notes = Buffer.from(buffer).toString("utf-8")
 const  notes = await getNote()

const note = {
    title,
    id: Date.now().toString()
}
notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify((notes)))
    console.log(chalk.bgGreen("Note was added"))
}
async function getNote() {
    const notes = await fs.readFile(notesPath, {encoding:"utf-8"} )
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}
async function printNotes() {
const notes = await getNote()
    console.log(chalk.bgBlue("Here is list notes:"))
    notes.forEach(note => {
        console.log(chalk.blue(note.id,note.title))
    })

}
async function removeNote(id) {
    const notes = await getNote()
    const updateNotes = notes.filter(item => item.id!==id);
    await fs.writeFile(notesPath, JSON.stringify((updateNotes)))
}
module.exports= {
    addNote,printNotes,removeNote
}