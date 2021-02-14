const path    = require('path')
const express = require('express')
const hbs     = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')
const forecast = require('./utils/forecast')
// express is actually a function as opposed to an object
// We call it to create a new express application

const app = express() // express function doen't take in any arguments
// Instead, we configure our server by using various methods provided on the application itself
const port = process.env.PORT || 3000

// Define pahts for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath           = path.join(__dirname, "../templates/views")
const partialsPath        = path.join(__dirname, "../templates/partials")

// Setup hanlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})
// By calling response.render, express goes off and it gets that view. Then, it converts it into html and makes sure
// that html gets back to the requester

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help Page', name: 'Sam'})
})

// Suppose app.com is our domain
// app.com/help
// app.com/about

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) return res.send({error: 'You must provide an address!'})
    
    geocode(address, (error, { latitude, longitude, location } = {}) => {
       if (error) return res.send({error})
       
       forcast(latitude, longitude, (error, forecastData) => {
           if (error) return res.send({error})
           
           res.send({
               forecast: forecastData,
               location,
               address
           })
       })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) return res.send({
        error: 'You must provide a search term'
    })

    res.send({
        produdcts: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sam',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', { 
        title: '404',
        name: 'Sam',
        message: 'Page Not Found'})
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})