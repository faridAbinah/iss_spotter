const request  = require('request');


/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API

  request('https://geo.ipify.org/api/v1?apiKey=at_ujviYD5Wg3eo9gZWtgDZIDqWJXbFp&ipAddress=216.209.47.112', (error,response,body) => {
    const data = JSON.parse(body);
    const IP = data.ip;

    // console.log(IP)
    if (error) {
      callback(error,null);
      return;
    }

    if (IP) {
      callback(null,IP);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  });
};

const fetchCoordsByIP = function(IP,callback) {
  request('https://freegeoip.app/json/216.209.47.112', (error,response,body) => {
    

    if (error) {
      callback(error,null);
      return;
    }
    //If non 200 status code assume error
    if (response.statusCode !== 200) {
      const msg = (`Status Code: ${response.statusCode} When fetching IP 216.209.47.112 `);
      
      callback(Error(msg),null);
      return;
    }

   
    const {latitude, longitude} = JSON.parse(body);

    callback(null, { latitude, longitude });

    
    

    
    

  });

};



const fetchISSFlyOverTimes = function(coords, callback) {

  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error,res,body) => {

    if(error) {
      callback(error,null);
      return;
    }

    if(res.statusCode !== 200) {
      
      callback(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`, null);
      return;
    }

    

    
    const passess = JSON.parse(body).response;

    callback(null,passess);
    
  })


};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation};