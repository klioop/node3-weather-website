const request = require('postman-request') // refer to the document of postman-request for option obj

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia2xpb29wIiwiYSI6ImNrbDB3MDZ5cjBsOW0yb3FvdWN0OWRrMGwifQ.bqW5XFbeHBeAqi1_3_GADA&limit=1`
    // encodeURIComponent changes arg into proper string for uri e.g. endcodeURIComponet(?) -> %3F
    request({ url, json: true }, (error, { body }) => {
        if (error) callback("Unable to connect location services", undefined)
        else if (body.features.length == 0) callback("Unable to find location. Try another search", undefined)
        else callback (undefined, {
            latitude : body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name,
        })
    })
    // console.log("This must starts than request indicating request wokrs asynchronously!! How Fun :)"); 
} // request func is npm module, which works asynchronously!

module.exports = geocode