import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

const secret = 'anepasreproduirechezvous';

export const isAuthenticated = (req: FastifyRequest, rep: FastifyReply, done: () => void) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token');

    const claims: any = jwt.verify(token, secret);

    if (!claims.sub) throw Error('No sub');

    req.user = { address: claims.sub };
    done();
  } catch (err) {
    console.log(err);
    rep.status(401).send();
  }
};
