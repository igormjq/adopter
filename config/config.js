import config from './config.json';

const env = process.env.NODE_ENV || 'development';

console.log('what env is this?', env);

if (env === 'test' || env === 'development') {
  const envConfig = config[env];
  
  Reflect.ownKeys(envConfig).forEach(key => process.env[key] = envConfig[key])
}

// console.log(config);