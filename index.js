import dotenv from "dotenv";

dotenv.config({
  path: `config/.env.dist.${process.env.APP_ENV}`,
});

const { default: buildApi } = await import("./src/clients/api/api.js");
const api = buildApi();

api.listen(process.env.APP_PORT, () => {
  console.log(`App started on port ${process.env.APP_PORT}`);
});
