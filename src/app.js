const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getForecast = require('./forecast')

const app = express()

const port = process.env.PORT || 3000
const templates = path.join(__dirname,"/../public/")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(templates))

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address."
        })
    }
    getForecast(req.query.address, (error, data) => {
        if (error){
            return res.send({error})

        }
        res.send(data)
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: "Help",
        msg: "HELP MESSAGE",
        name: "Rotem Zecharia"
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: "About Me",
        name: "Rotem Zecharia"
    })
})

app.get('', (req, res) =>{
    res.render('index',{
        title: "Weather",
        name: "Rotem Zecharia"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: "Help page not found",
        title: "404",
        name: "Rotem Zecharia"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: "Page not found",
        title: "404",
        name: "Rotem Zecharia"
    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})