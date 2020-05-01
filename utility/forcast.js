const request = require('request')

const forcast = (lat, long, callback) =>{

    const api = `https://api.darksky.net/forecast/df0133328f51436a64048ab37949f66c/${lat},${long}`

    request({url:api, json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to the server', undefined)
        }else if (body.code === 400) {
            callback('the given location is invalid', undefined)
        }else {
            callback(undefined, {
                summary:body.currently.summary,
                temperature:body.currently.temperature
            })
        }
    })


}

module.exports = forcast