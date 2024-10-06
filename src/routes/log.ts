import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifyInstance } from "fastify";

const T = Type.Object({
  file: Type.Optional(Type.String()),
  lines: Type.Optional(Type.Number()),
  filter: Type.Optional(Type.String()),
});

type T = Static<typeof T>;

export default async function (fastify: FastifyInstance) {
  fastify.get<{
    Querystring: T;
  }>("/log", { schema: { querystring: T } }, (req) => {
    return { hello: "world" };
  });
}
