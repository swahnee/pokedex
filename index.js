import buildApi from "./src/clients/api/api.js";
import dotenv from "dotenv";

dotenv.config({
  path: `config/.env.dist.${process.env.APP_ENV}`,
});

const api = buildApi();

api.listen(process.env.APP_PORT, () => {
  console.log(`App started on port ${process.env.APP_PORT}`);
});
