export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    db_name: process.env.DB_NAME,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
  },
});
