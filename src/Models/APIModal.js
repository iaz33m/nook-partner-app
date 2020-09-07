const env = 'production';
// const env = 'dev';

let host = 'https://nookapis.howbiotech.com/api/v1/en';
let app_id = 4;

if(env === 'production'){
   host = 'https://nookservices.applet.solutions/api/v1/en';
   app_id = 2;
}

class APIModel {
   static HOST = host;
}

export {app_id};

export default APIModel;