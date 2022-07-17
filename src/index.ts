import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";

require("dotenv").config();

const main = async () => {
  // connect to db
  const orm = await MikroORM.init(microConfig);
  const emFork = orm.em.fork();

  // run migrations
  await orm.getMigrator().up();
  
  // run sql
  const post = emFork.create(Post, { title: "My first post" });
  await emFork.persistAndFlush(post);

  const posts = await emFork.find(Post, {});
  console.log(posts);
};

main().catch((err) => {
  console.error(err);
});
