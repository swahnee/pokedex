const axios = require("axios");
axios.defaults.timeout = 3000;

require("dotenv").config({
  path: `config/.env.dist.${process.env.APP_ENV}`,
});

const api = require("./src/clients/api/api");

api.listen(process.env.APP_PORT, () => {
  console.log(`App started on port ${process.env.APP_PORT}`);
});
