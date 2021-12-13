const whitelist = [
  'https://antler-twitter-app.firebaseapp.com',
  'https://antler-twitter-app.web.app'
];

const corsOptions = {
  origin: function (origin: any, callback: Function) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Error: not allowed by CORS'))
    }
  }
}

const cors = require('cors')(corsOptions);

export default cors;