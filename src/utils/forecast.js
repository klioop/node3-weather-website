const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=69b548ed32424256788ee11bb0935f32&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`
    request( { url, json: true }, (error, { body }) => { // response is an object
        if (error) callback('Unable to connect to weather forcasting services.', undefined)
        else if (body.error) callback('cannot find the location. Please, retry with another coordinates', undefined)
        else callback(undefined, 
            `The weather is ${body.current.weather_descriptions[0]}, temperature is ${body.current.temperature}, it feels like ${body.current.feelslike}, 
            and The probability of raining is ${body.current.precip}. Finally, humidity is about ${body.current.humidity}%.`
            ) 
        
    })
}

module.exports = forecast