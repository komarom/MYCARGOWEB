const config = {
  development: {
    apiBaseUrl: 'http://27.71.17.99:9090/api'
  },
  production: {
    apiBaseUrl: 'http://27.71.17.99:9090/api'
  }
};

const env = process.env.NODE_ENV || 'development';
export default config[env];
