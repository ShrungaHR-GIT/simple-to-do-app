module.exports = {
  mongodb: {
    connectionString: 'mongodb+srv://username:password@cluster0.mongodb.net/mydb?retryWrites=true&w=majority',
    ssl: true,             // Atlas requires SSL
  },
  site: {
    baseUrl: '/',
    port: 8081,
    cookieSecret: 'cookiesecret',
    sessionSecret: 'sessionsecret'
  }
};

