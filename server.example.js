const http = require("http")
const chalk = require("chalk")
const express = require("express")
const fs = require("fs/promises")
const path = require("path")
const {addNote} = require("./note.controller")

const port = 3000

const basePath = path.join(__dirname, "pages")
const server = http.createServer(async (req,res) => {
    if (req.method === "GET") {
        const content = await fs.readFile(path.join(basePath, "index.ejs"))
        // res.setHeader("Content-Type", "text/html")
        res.writeHead(200, {"Content-Type":"text/html"})
        res.end(content)
    } else if (req.method === "POST") {
        const body=[]
        res.writeHead(200, {"Content-Type":"text/plain", "charset":"utf-8"})
        req.on("data", data => {
            body.push(Buffer.from(data))

        } )
        req.on("end", () => {
            console.log(body.toString())
            const title = body.toString().split("=")[1].replaceAll("+", " ")
            addNote(title)
            res.end(`Title = ${title}`)
        } )

    }
    // res.end("Hello from server!!! Hello There")

})

server.listen(port, () => {
    console.log(chalk.green(`Server started on port ${port}`))
})