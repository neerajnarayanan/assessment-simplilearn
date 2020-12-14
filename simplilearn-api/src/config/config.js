module.exports = {
  DEV_DB: "mongodb://localhost:27017/database_development",
  JWT_PRIVATE_SECRET: "secret",
  JWT_PUBLIC_SECRET: "opensecret",
  HASH: 5,
  env: 'development',
  port: '8000',
  mongoose: {
    url: process.env.MONGO_URL,
    options : {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
  }
};
