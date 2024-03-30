import express from "express";
import createApolloserver from "./grapghql";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
  });

  app.use("/graphql", expressMiddleware(await createApolloserver()));

  app.listen(PORT, () => console.log(`Server started at port:${PORT}`));
}

init();
