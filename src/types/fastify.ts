import 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    user: { address: string };
  }
}
