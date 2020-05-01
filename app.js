const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utility/geocode.js')
const forcast = require('./utility/forcast.js')
const request = require('request')

const app = express()
const port = process.env.PORT || 3000
// define paths for express conf.
const publicDirPath = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '/template/views')
const partialsPath = path.join(__dirname, '/template/partials')


// setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

// index page
app.get('/', (req, res)=>{
    res.render('index', {
        title:'weather forcast',
        desc:'This is a home page',
        author:'surazzShahil'
    })
})
// src page
app.get('/src', (req, res)=>{
    res.render('src', {
        title:'src page',
    })
})

// about page
app.get('/about', (req, res)=>{
    res.render('about', {
        title:'about',
    })
})
// weather api
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'provide an address'
        })
    }
    geoCode(req.query.address,(error, {latitude, longitude, placeName}= {})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        
        forcast(latitude, longitude, (error, {temperature, summary}={})=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                temperature:temperature,
                summary:summary,
                placeName,
                address:req.query.address
            })
        })
    })
})

// 404 page
app.get('/*', (req,res)=>{
    res.render('404',{
        title:'404',
        errorDesc:'Page Not Found'
    })
})

app.listen(port, ()=>{
    console.log('port started at 3000')
})