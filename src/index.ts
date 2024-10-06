import autoload from "@fastify/autoload";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import path from "path";

const app = fastify({}).withTypeProvider<TypeBoxTypeProvider>();

const start = async () => {
  try {
    console.log("Starting...");
    await app.register(autoload, {
      dir: path.join(import.meta.dirname, "routes"),
    });
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

await start();
