const express = require("express")
const app = express()
const mustache = require("mustache-express")
const session = require("express-session")
const word = require("./words")
const randomWord = word.randomWord

app.engine("mustache", mustache())
app.set("view engine", "mustache")


const routeIndex = app.get("/", function(req, res){
  res.render("index", {
    randomWord: randomWord
  })
})

module.exports = routeIndex
