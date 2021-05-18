const request = require('request')

const getForecast = (address, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=f9fb4302b0fc0f9cbe0d44e3e265b76f&query=" +
        encodeURIComponent(address)

    request({url: url, json: true}, (error, { body }) => {
        if (error) {
            callback("Couldn't connect to weather server")
        } else if(body.error){
            callback("Couldn't find the location")
        } else {
            const msg = body.current.weather_descriptions + ". The tempeature is "
            + body.current.temperature + " and it feels like " + body.current.feelslike
            callback(undefined, {
                             address: body.request.query,
                             forecast: msg
                         })
            }
    })
}

module.exports = getForecast