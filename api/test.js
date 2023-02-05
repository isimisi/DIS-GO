import axios from 'axios';

// const asyncTest = async () => {
//    const startTime = Date.now();
//    await axios.get('http://http-api.isimisi.live/asyncTest');

//    const timeResponse1 = Date.now() - startTime;

//    await axios.get('http://http-api.isimisi.live/asyncTest');

//    const timeReponse2 = Date.now() - startTime;

//    const difference = timeReponse2 - timeResponse1;
//    return timeReponse2;
// };

// const syncTest = async () => {
//    const startTime = Date.now();
//    await axios.get('http://http-api.isimisi.live/syncTest');

//    const timeResponse1 = Date.now() - startTime;

//    await axios.get('http://http-api.isimisi.live/syncTest');

//    const timeReponse2 = Date.now() - startTime;

//    const difference = timeReponse2 - timeResponse1;
//    return timeReponse2;
// };

// (async () => {
//    const async = [];
//    const sync = [];

//    for (let i = 0; i < 10; i++) {
//       const syncDiff = await syncTest();
//       const asyncDiff = await asyncTest();
//       sync.push(syncDiff);
//       async.push(asyncDiff);
//    }

//    const syncAvg = sync.reduce((a, b) => a + b, 0) / sync.length;
//    const asyncAvg = async.reduce((a, b) => a + b, 0) / async.length;

//    console.log('Average Synchronous response difference: ', syncAvg);
//    console.log('Average Asynchronous response difference: ', asyncAvg);
// })();

(async () => {
   const startTime = Date.now();

   // const promises = [
   //    axios.get('http://http-api.isimisi.live/asyncTest'),
   //    axios.get('http://http-api.isimisi.live/asyncTest'),
   // ];

   // await Promise.all(promises);
   for (let i = 0; i < 1000000000; i++) {
      // do nothing
   }

   const responseTime = Date.now() - startTime;
   console.log(responseTime);
})();

// function pause(milliseconds) {
// 	var dt = new Date();
// 	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
// }
// console.time()
// pause(1000)
// console.timeEnd()
