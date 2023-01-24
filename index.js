const yargs = require("yargs")
const pkg = require("./package.json")
const {addNote, printNotes, removeNote} = require("./note.controller")
yargs.version(pkg.version)
yargs.command({
    command: "add",
    describe:" add note to List",
    builder: {
        title: {
            type:"string",
            describe:"Note title",
            demandOption: true
        }
    },
    handler({title}) {
addNote(title)
    }
})

yargs.command({
    command: "List",
    describe:"Print all List",
    async handler() {
      return   printNotes()
    }
})
yargs.command({
    command: "remove",
    describe:" remove note from List",
    builder: {
        id: {
            type:"string",
            describe:"id Note",
            demandOption: true
        }
    },
   async handler({id}) {
     return   removeNote(id)
    }
})


yargs.parse()