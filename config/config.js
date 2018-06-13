import config from './config.json';

const env = process.env.NODE_ENV || 'development';

console.log('what env is this?', env);

if (env === 'test' || env === 'development') {
  const envConfig = config[env];
  
  Reflect.ownKeys(envConfig).forEach(key => process.env[key] = envConfig[key])
}
// production key mongodb://admin:adopteradmin@ds119800.mlab.com:19800/adopter-api
// console.log(config);