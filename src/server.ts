import fastify from "fastify";

const app = fastify();

console.info("ISSO AÍ ${2 + 2}");

app.listen({ port: 3333 })
  .then(() => console.info('HTTP server running on http://localhost:3333'))
  .catch(err => console.error('Fail to run server:', err));