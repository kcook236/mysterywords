const express = require("express")
const app = express()
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const validator = require("express-validator")
const session = require("express-session")
const word = require("./words")
const randomWord = word.randomWord
const wordLength = randomWord.length

console.log(randomWord)

app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))

var sess = {
  secret: "keyboard cat",
  cookie: {},
  saveUninitialized: true,
  resave: true
}
app.use(session(sess))

app.use(function(req,res,next){
  if (!req.session.pageLoads){
    req.session.pageLoads = 0
  } req.session.pageLoads += 1
  next()
})

const answerArray = []
const guesses = (wordLength + 3)
app.get("/", function(req, res){
  const mysteryWord = randomWord.split("")
  let playbar = false
  for (let i = 0; i < randomWord.length; i++) {
    if(answerArray.indexOf(randomWord[i]) >= 0){
      mysteryWord[i] = randomWord[i]
    } else {
      mysteryWord[i] = "_"
      playbar = true
    }
  }
  if(!playbar){
    res.redirect("/win")
  } else {
    res.render("index", {
      randomWord: randomWord,
      mysteryWord: mysteryWord,
      answerArray: answerArray,
      guesses: guesses
    })
  }
})

// app.post("/", function(req,res){
//   const answerArray = []
//   for (var i = 0; i < randomWord.length; i++) {
//     answerArray[i]= "_"
//   }
// })
//

app.get("/win", function(req,res){
  res.render("win")
})

// app.post("win", function(req,res){
//   res.redirect("/")
// })

app.post("/", function(req, res){
  const guessWord = req.body.guess
  answerArray.push(guessWord)
  res.redirect("/")
})


app.listen(3000, function() {
  console.log("The robots are listening!")
})
