const config = {
  database: 'mongodb://localhost:27017/calendar',
  secret: 'somesecret',
  jwtSession: {
    session: false
  },
  port: process.env.PORT || 3002
};

export default config;