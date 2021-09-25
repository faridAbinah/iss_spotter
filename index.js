// const { request } = require('http');
// const { callbackify } = require('util');
// const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes } = require('./iss');
// const exampleCoords =  { latitude: '49.27670', longitude: '-123.13000' };
const {nextISSTimesForMyLocation} = require('./iss')

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIp("216.209.47.112", (error,coordinates) => {
//  if(error) {
//    console.log(`It didnt work, sorry `);
//    return;

   
//  }
//   console.log(`returned coordinates for latitude and longitude ${coordinates.latitude} ${coordinates.longitude}`);


  
// });

// fetchISSFlyOverTimes(exampleCoords, (error,passTimes) => {

//   if(error) {

//     console.log("It didn't work ");
//     return;
//   }


//   console.log('It worked! Returned flyover times: ', passTimes);

// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error,passTimes) => {
  if(error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);
});

 