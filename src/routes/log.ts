import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";
import fs from "fs";
import fsp from "fs/promises";
import readline from "readline";
import _ from "underscore";
import { FILE_MOUNT } from "../constants.js";

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

    // If no user provided file, simply fetch the newest.
    file ??= await getNewestFile();

    // Make scalable async calls.
    const rl = readline.createInterface({
      input: fs.createReadStream(FILE_MOUNT + file),
    });

    const data = [];
    for await (const line of rl) {
      // If no user provided filter OR filter matches.
      if (new RegExp(filter).test(line)) {
        data.push(line);

        // Return when length equals user provided lines, otherwise keep trying.
        if (data.length === lines) {
          return data;
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
