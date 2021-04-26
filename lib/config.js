/*
*Create and export configuration variables
*
*/

//Container for all the environment
var environments = {};

//Staging (default) environment
environments.staging = {
    "httpPort": 3000,
    "httpsPort": 3001,
    "envName": "staging",
    "stripe": {
        "apiKey": "sk_test_51ILxb4LuA2WsKV31VoW2DXn1qwNgircTBBlPl6eTUzEd6U54YhC4nXLJSWvgIn358SGcjHMZutI0mi6n5MhiuCGL00hwWuTwx2:"
    },
    "mailgun": {
        "apiKey": "47fa13a263b32a97bbc0755f61bd8e6b-d32d817f-44c1aeef:"
    },
    "templateGlobals" : {
        "appName": "UptimeChecker",
        "companyName": "EmperorFizzy, Inc",
        "yearCreated": "2021",
        "baseUrl": "http://localhost:3000/"
    },
};

//Production environment
environments.production = {
    "httpPort" : 5000,
    "httpsPort": 5001,
    "envName": "production",
    "templateGlobals" : {
        "appName": "UptimeChecker",
        "companyName": "EmperorFizzy, Inc",
        "yearCreated": "2021",
        "baseUrl": "http://localhost:5000/"
    }
};


//Determine which environment was passed as command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == "string" ? process.env.NODE_ENV.toLowerCase() : ""

//Check that the current environment is one of the environments above,if not,default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == "object" ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;