import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const main = async () => {
  // connect to db
  const orm = await MikroORM.init(microConfig);
  const emFork = orm.em.fork();
  // run migrations
  await orm.getMigrator().up();

  // run sql
  // const post = emFork.create(Post, { title: "My first post" });
  // await emFork.persistAndFlush(post);
  // const posts = await emFork.find(Post, {});
  // console.log(posts);

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: emFork }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.get("/", (_, res) => {
    res.send("hello");
  });
  app.listen(PORT, () => {
    console.log(`Server started on localhost: ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
