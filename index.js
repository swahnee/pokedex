const api = require("./src/clients/api/api");

api.listen(process.env.APP_PORT, () => {
  console.log(`App started on port ${process.env.APP_PORT}`);
});
