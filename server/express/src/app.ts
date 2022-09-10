import express from "express";
import dotenv from "dotenv";
import loaders from "./loaders";

dotenv.config();

async function startServer() {
  const app: express.Application = express();
  await loaders({ expressApp: app });
  const port = process.env.PORT || 5000;
  app.listen(port, async () => {
    console.log(`Express app.ts -> Connected to http://localhost:${port}`);
  });
}

export = startServer();
