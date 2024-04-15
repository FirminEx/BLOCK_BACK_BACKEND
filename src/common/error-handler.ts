import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export const ErrorHandler = (error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
  console.log(error);

  if (reply.statusCode === 400 || error.statusCode === 400 || error.name === 'MongoServerError')
    return reply.status(400).send({ error: 'Bad request' });

  if (reply.statusCode === 404 || error.statusCode === 404) return reply.status(404).send({ error: 'Not found' });

  reply.status(500).send({ error: 'Internal server error' });
};
