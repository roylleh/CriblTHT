import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import fs from "fs";
import fsp from "fs/promises";
import readline from "readline";
import _ from "underscore";
import { FILE_MOUNT, LINES_DEFAULT } from "../constants.js";

const T = Type.Object({
  file: Type.Optional(Type.String()),
  lines: Type.Optional(Type.Number()),
  filter: Type.Optional(Type.String()),
});

type T = Static<typeof T>;

export default async function (fastify: FastifyInstance) {
  fastify.get<{
    Querystring: T;
  }>("/log", { schema: { querystring: T } }, async (req) => {
    let { file, lines, filter } = req.query;

    file ??= await getNewestFile();
    lines ??= LINES_DEFAULT;

    const rl = readline.createInterface({
      input: fs.createReadStream(FILE_MOUNT + file),
    });

    const data = [];
    for await (const line of rl) {
      if (!filter || new RegExp(filter).test(line)) {
        data.push(line);
        if (data.length === lines) {
          break;
        }
      }
    }

    return data;
  });
}

const getNewestFile = async () => {
  const folder = await fsp.readdir(FILE_MOUNT);
  const newest = _.max(
    folder,
    (file) => fs.statSync(FILE_MOUNT + file).mtimeMs,
  ) as string;

  return newest;
};
