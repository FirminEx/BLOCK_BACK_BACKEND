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

  const port = +(process.env.PORT ?? 9000);

  server.withTypeProvider<TypeBoxTypeProvider>();
  server.listen(port, '0.0.0.0', (err) => console.log(`Server is listening on port ${port}`, err ?? ''));
};

bootstrap();
