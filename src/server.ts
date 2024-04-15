import cors from '@fastify/cors';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify from 'fastify';
import { connectDb } from './common/db';
import { ErrorHandler } from './common/error-handler';
import { AuthController } from './modules/auth/auth.controller';
import { GuardiansController } from './modules/guardians/guardians.controller';
import './types/fastify';

const server = Fastify({ logger: { transport: { target: 'pino-pretty' } } });

const bootstrap = async () => {
  await connectDb();
  server.setErrorHandler(ErrorHandler);
  await server.register(cors, { origin: '*' });
  await server.register(AuthController, { prefix: 'auth' });
  await server.register(GuardiansController, { prefix: 'guardians' });

  server.withTypeProvider<TypeBoxTypeProvider>();
  server.listen({ port: +(process.env.PORT ?? 9000) }, (err) => console.log('Server listening on port 9000', err ?? ''));
};

bootstrap();
