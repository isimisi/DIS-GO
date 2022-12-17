import Box from 'cli-box';
import Env from '#config/Env';

const version = 'v1.0.0';
const serverName = 'DIS-API';

const ip = {
   address: function () {
      return '127.0.0.1';
   },
};

export default function (port) {
   const box = new Box(
      {
         w: 45,
         h: 5,
         stringify: false,
         marks: {
            nw: '╭',
            n: '─',
            ne: '╮',
            e: '│',
            se: '╯',
            s: '─',
            sw: '╰',
            w: '│',
         },
         vAlign: 'bottom',
         hAlign: 'middle',
      },
      `Server @ ${version}
       ► Name :   ${serverName}
        ► Device IP :   ${ip.address()}
     
     Listening: http://localhost:${port}/`
   );

   return box.stringify();
}
