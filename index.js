
const chalk = require("chalk")
const express = require("express")
const path = require("path")
const {addNote, getNote, removeNote,updateNote } = require("./note.controller")

const port = 3000
const app = express()
app.set("view engine", "ejs")
app.set("views", "pages")
app.use(express.json())
 app.use(express.urlencoded({
     extended:true
 }))
app.use(express.static(path.resolve(__dirname, "public")))
// const basePath = path.join(__dirname, "pages")
app.get("/", async (req,res) => {
// res.sendFile(path.join(basePath, "index.ejs"))
    res.render("index", {
        title: "express app",
        notes: await getNote(),
        created: false
    })
})
app.post("/", async (req,res) => {
    await  addNote(req.body.title)
    // res.sendFile(path.join(basePath, "index.ejs"))
    res.render("index", {
        title: "express app",
        notes: await getNote(),
        created: true
    })
})
app.delete("/:id", async (req,res) => {
    await removeNote(req.params.id)
    console.log(req.params.id)
    res.render("index", {
        title: "express app",
        notes: await getNote(),
        created: false
    })
})
app.put("/:id", async (req,res) => {
await updateNote(req.params.id,req.body.data)
    res.render("index", {
        title: "express app",
        notes: await getNote(),
        created: false
    })


})
app.listen(port, () => {
    console.log(chalk.green(`Server started on port ${port}`))
})