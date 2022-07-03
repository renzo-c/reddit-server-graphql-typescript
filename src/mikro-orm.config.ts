import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}',
  },
  entities: [Post],
  dbName: "reddit",
  type: "postgresql",
  debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];
