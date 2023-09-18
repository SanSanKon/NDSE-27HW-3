const http = require('http');

const loggedCity = process.argv[2];

if(!loggedCity) {
    console.log('Please, enter the name of the city.');
    process.exit(1);
}

const myAPIKey = process.env.myAPIKey;

const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${loggedCity}`;

http.get(url, (res) => {
    const {statusCode} = res;
    if (statusCode !== 200) {
        console.log(`statusCode: ${statusCode}`);
        return
    }

    res.setEncoding('utf8');
    let responseData = '';
    res.on('data', (chunk) => {
        return responseData += chunk;
    })
    res.on('end', () => {
        let parsedResponseData = JSON.parse(responseData);
        const { name, country, region, localtime } = parsedResponseData.location;
        const {temperature, feelslike, wind_speed, pressure, humidity, is_day} = parsedResponseData.current;
        console.log(`Name of the city you requested a forecast for: ${name}\n`,
                    `This city is situated in the country: ${country}\n`,
                    `This city is situated in the region: ${region}\n`, 
                    `The local date and time of the city is: ${localtime}\n`,
                    `Temperature is: ${temperature}\n`, 
                    `Temperature feels like is: ${feelslike}\n`, 
                    `Wind speed is: ${wind_speed}\n`, 
                    `Pressure is: ${pressure}\n`, 
                    `Humidity is: ${humidity}\n`,
                    `Is there a day now: ${is_day}`);
        //console.log(parsedResponseData);
    })
}).on('error', (err) => {
    console.log(err);
});