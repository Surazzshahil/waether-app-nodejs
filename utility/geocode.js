const request = require('request')


const geoCode = (address, callback) =>{

    const api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3VyYXp6c2hhaGlsIiwiYSI6ImNrOWdoZWI3eDAwbGEza3FkMnl4bXl3OXIifQ.pHUPesTv4dLfPYO3EZy9tw&limit=1`

    request({url:api, json:true},(error, {body})=>{


            if(error) {
                callback('unable to connect to the location', undefined)
            }else if (body.features.length===0) {      
                callback('unable to find the location plase try another', undefined)
            }else {
                callback(undefined,{
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    placeName: body.features[0].place_name
                })
            }


    })

}
module.exports=geoCode