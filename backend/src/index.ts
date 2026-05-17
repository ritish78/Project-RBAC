import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { SERVER_PORT } from "./config/index.js";

const fastify = Fastify({
  logger: true,
});

fastify.get("/api/v1/ping", (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ message: "Pong!" });
});

fastify.listen({ port: SERVER_PORT }, (error: Error | null, address: string) => {
  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }

  console.log("Fastify server is running on port: ", SERVER_PORT);
});
