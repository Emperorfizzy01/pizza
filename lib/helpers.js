/*
* Helpers for various tasks
*
*/

// Dependencies
const crypto = require('crypto');
const config = require('./config')
var https = require('https');
var querystring = require('querystring');
var path = require('path');
var fs = require('fs');
// Container for all the helpers
var helpers = {};


// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str) {
    try{
     var obj = JSON.parse(str);
     return obj;
    } catch(e) {
        return {};
    }
}

// Create a string of random alphanumeric characters of a given length
helpers.createRandomString = function(strLength) {
    strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
    if(strLength) {
  // Define all the possible characters that could go into a string
  var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

     // Start the final string
     var str = '';
     for (let i = 1; i <= strLength; i++){
        // Get a random character from the possible characters
      var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        // Append this character to the final string
        str+=randomCharacter
     }

      // Return the final string
     return str;
    } else {
        return false
    }
};

helpers.verifyPayment = function(emailAddress,data,callback) {
    
    if(emailAddress) {
        const payload = {
             amount: data.payload.amount * 100,
             currency: data.payload.currency, 
             source: data.payload.source,
             description: data.payload.description
         }
         
         
         // Stringify Payload
         const stringPayload = querystring.stringify(payload);
       
         // Configure the request details
         var requestDetails = {
             'protocol': 'https:',
             'hostname': 'api.stripe.com',
             'method': 'POST',
             'path': '/v1/charges',
             'auth': config.stripe.apiKey
         };

          // Instantiate the request object
        var req = https.request(requestDetails, function(res) {
            // Grab the status of the sent request
            var status = res.statusCode;
            // Callback successfully if the request went through
            if(status == 200 || status == 201) {
                callback(false);
                helpers.emailUser(emailAddress);
            } else {
                callback('Status code returned was' + status);
            }
      });

      //Bind to the error event so it doesnt get thrown
      req.on('error', function(e) {
          callback(e)
      })

      // Add the payload
      req.write(stringPayload);

      // End the request
      req.end();
    } else {
        callback('Given parameter is missing or invalid');
    }
}

helpers.emailUser = function(emailAddress) {
    
    if(emailAddress) {
        console.log(emailAddress);
        // Configure the request payload
        var payload = {
          'From': 'mailgun@sandbox1076343530df4db18c660d8faa992001.mailgun.org',
          'To': emailAddress,
          'subject':'Thanks for buying from us', 
          'text': 'Testing some Mailgun awesomeness!'
        }

         // Stringify the payload
        var stringPayload = querystring.stringify(payload);
 
        // Configure the request details
        var requestDetails = {
            'protocol': 'https:',
            'hostname': 'api.mailgun.net',
            'method': 'POST',
            'path': '/v3/sandbox1076343530df4db18c660d8faa992001.mailgun.org/messages',
            'auth': config.mailgun.apiKey
    }
     // Instantiate the request object
        var req = https.request(requestDetails, function(res) {
            // Grab the status of the sent request
            var status = res.statusCode;
            console.log(status);
            // Callback successfully if the request went through
      });

      //Bind to the error event so it doesnt get thrown
      req.on('error', function(e) {
          console.log(e);
      })

      // Add the payload
      req.write(stringPayload);

      // End the request
      req.end();
    } else {
        console.log('Given parameter is missing or invalid');
    }
};

// Get the string content of a template
helpers.getTemplate = function(templateName,data,callback) {
    templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
    data = typeof(data) == 'object' && data !== null ? data : {};
    if(templateName) {
      var templateDir = path.join(__dirname,'/../templates/');
      fs.readFile(templateDir+templateName+'.html','utf8',function(err,str) {
          if(!err && str && str.length > 0) {
              // Do interpolation on the string
              var finalString = helpers.interpolate(str,data);
              callback(false,finalString);
          } else {
              callback('No template could be found');
          }
      })
    } else {
        callback('A valid template name wasnt specified');
    }
};

// Add the universal header and footer to a string,and pass provided data object to the header and footer for interpolation
helpers.addUniversalTemplates = function(str,data,callback) {
   str = typeof(str) == 'string' && str.length > 0 ? str : '';
   data = typeof(data) == 'object' && data !== null ? data : {};
   // Get header
   helpers.getTemplate('_header',data,function(err,headerString) {
       if(!err && headerString) {
           // Get the footer
           helpers.getTemplate('_footer',data,function(err,footerString) {
               if(!err && footerString) {
                   // Add them all together
                   var fullString = headerString+str+footerString
                   callback(false,fullString);
               } else {
                   callback('Could not find the footer template');
               }
           })
       } else {
           callback('Could not find the header template');
       }
   })
}

// Take a given string and a data object and find/replace all the keys within it
helpers.interpolate = function(str,data) {
    str = typeof(str) == 'string' && str.length > 0 ? str : '';
    data = typeof(data) == 'object' && data !== null ? data : {};

    // Add the templateGlobals to the data object,prepending their key name with 'global'
    for(var keyName in config.templateGlobals) {
        if(config.templateGlobals.hasOwnProperty(keyName)) {
            data['global.'+keyName] = config.templateGlobals[keyName];
        }
    }

    // For each key in the object ,insert its value into the string at the corresponding
    for(var key in data) {
        if(data.hasOwnProperty(key) && typeof(data[key]) == 'string') {
            var replace = data[key];
            var find = '{'+key+'}';
            str = str.replace(find,replace);
        }
    }
    return str;
}

// Get the content of a static(public) assets
helpers.getStaticAsset = function(fileName,callback) {
    fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
    if(fileName) {
       var publicDir = path.join(__dirname,'/../public/');
       fs.readFile(publicDir+fileName,function(err,data) {
           if(!err && data) {
               callback(false,data);
           } else {
               callback('No file could be found')
           }
       })
    } else {
       callback('A valid file name was not specified')
    }
}





// Export helpers
module.exports = helpers;