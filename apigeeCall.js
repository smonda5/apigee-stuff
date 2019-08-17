var request = require('request')
const config = require('./config/apigeeConfigs.json')

// Declare constants
const token = config.token;
const url = `${config.baseUrl}/organizations/${config.org}/environments/${config.env}/${config.resource}`;
console.log("url is "+url);

// Arrow function implementation. The below statement is exactly same as the function expression var foo = function() {}
var getResources = () => {
  console.log("gathering list of " + config.resource + " ...");
  var options = {
    url: url,
    json: true,
    headers: {'Authorization': token}
  };
// wrap the asynchronous http request in a Promise
  return new Promise((resolve, reject) => {
    request.get(options, (err, resp, body) => {
      if(err) {
        reject(new Error('Something went wrong. Response code ' + resp.statusCode));
      } else if(resp.statusCode == 401) {
        reject(new Error('Invalid token. Response code ' + resp.statusCode));
      } else if(resp.statusCode == 403) {
        reject(new Error('Unauthorized. Response code ' + resp.statusCode));
      } else if(resp.statusCode != 200) {
        reject(new Error('Something is still worng. Response code ' + resp.statusCode));
      } else {
        console.log("Data retrieved successfully. Your " + config.resource + " are" + JSON.stringify(body));
        resolve(body)
      }
    })
  })
}

var getResourceDetails = (resourcesArr) => {
  // resourcesArr is an array object containing the list of targetservers or KVMs from apigee
  // map will take each element of the array and call the request function
  // Each of these calls will be within a Promise
  // Promise.all resolves all the promises and returns the final result
  var resArr = resourcesArr.map(element => {
    var queryUrl = `${url}/${element}`
    var options = {
      url: queryUrl,
      json: true,
      headers: {'Authorization': token}
    };

    return new Promise((resolve, reject) => {
      request.get(options, (err, resp, body) => {
        if(err) {
          reject(new Error('Something went wrong. Response code ' + resp.statusCode));
        } else if(resp.statusCode != 200) {
          reject(new Error('Something is still wrong. Response code ' + resp.statusCode));
        } else {
          resolve(body)
        }
      })
    })
  });
  Promise.all(resArr)
  .then(result => {
    //output of map is another array, so using the JSON.stringify to convert to JSON
    console.log(config.resource + "details are " + JSON.stringify(result))
  })
}

getResources()
.then(getResourceDetails)
.catch(err => {
  console.log(err);
});
