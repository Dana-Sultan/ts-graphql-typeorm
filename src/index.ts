import "reflect-metadata";

import express, { Response } from "express";
import config from "config";
import Container from "typedi";
import ServerInitializer from "./initializers/server.initializer";

const port = parseInt(config.get("port"));

const app = express();
app.get("/", (_, res: Response) => res.redirect("/graphql"));

Container.set("app", app);

const start = async () => {
  await Container.get(ServerInitializer).init();
  console.log("Server is running");
  app.listen(port, () => {
    console.log("App is running");
  });
};

start();
