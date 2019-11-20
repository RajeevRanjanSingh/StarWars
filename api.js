import {
    AsyncStorage,
  } from 'react-native';
  
  var baseURL = 'https://swapi.co/api/';

  var api = {
    request(url, method, body) {
        
            // if (user_id_required) {
                // let userObject = JSON.parse(data);
                return fetch(baseURL+url, {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer '+ (userObject ? userObject.access_token : null)
                    },
                    body: body === null ? null : JSON.stringify(body)
                })
            // } else {
                // let userObject = JSON.parse(data);
                // console.log("url is "+ baseURL+url);
                // return fetch(baseURL+url, {
                //     method: method,
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json',
                //         'Authorization': 'Bearer '+ (userObject ? userObject.access_token : null)
                //     },
                   
                //     body: body === null ? null : JSON.stringify(body)
                // })
                
            // }
    },
};


module.exports = api;