import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';

require("dotenv").config();

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}',
  },
  entities: [Post],
  type: "postgresql",
  dbName: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];
