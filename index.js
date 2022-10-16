const express = require("express")
const hbs = require("hbs")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const dotenv=require("dotenv")
dotenv.config()

const transpoter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.MAILSENDER,
        pass: process.env.PASSWORD
    }
})
app.set("view engine", "hbs")
app.use(express.static("./views"))

const uncoder = bodyParser.urlencoded({ extended: true })

hbs.registerPartials(path.join(__dirname, "./views/partials"))

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/services", (req, res) => {
    res.render("Services")
})
app.get("/contact", (req, res) => {
    res.render("Contact")
})
app.post("/contact", uncoder, (req, res) => {
   
    let mailOption = {
        from: process.env.MAILSENDER,
        to: req.body.gmail,
        subject: "Your Query Received || Team Evant Planner ",
        text: "Thanks To Share Query With Us || Our Team Will Contact You As Soon As possible "
    }
    transpoter.sendMail(mailOption, (error, data) => {
        if(error)
        console.log(error);
    })
    mailOption = {
        from: process.env.MAILSENDER,
        to:process.env.MAILSENDER,
        subject: "One New Query Received || ",
        text:
        ` One New Query Received From Client ,
        Name       :${req.body.name}
        Address    :${req.body.address}
        Phone No   :${req.body.phoneno}
        Gmail      :${req.body.gmail}
        Massege    :${req.body.massege}
        
        `
    }
    transpoter.sendMail(mailOption, (error, data) => {
        if(error)
        console.log(error);
    })
    res.render("Contact")

})


app.get("/about", (req, res) => {
    res.render("About")
})
var Port=process.env.Port||8000
app.listen(Port, () => console.log(`server is running at port ${Port}`))