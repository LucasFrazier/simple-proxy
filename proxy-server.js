import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
});
await fastify.register(cors, {
  origin: "{{ INSERT_ORIGIN }}",
});

const apiToken = "{{ INSERT_TOKEN }}";

fastify.post("/proxy", async (request, reply) => {
  try {
    const apiUrl = "{{ INSERT_API_URL }}";
    const requestBody = { "INSERT_REQUEST_BODY" };

    const response = await fetch(apiUrl, {
      method: "{{ INSERT_METHOD }}",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const data = await response.json();

    reply.send(data);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
});

// Start the server
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
