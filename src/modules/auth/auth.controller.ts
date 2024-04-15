import { ethers } from 'ethers';
import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

const secret = 'my-secret-de-ouf';

export const AuthController: FastifyPluginCallback = (fastify, _, done) => {
  fastify.post(
    '/login',
    async (req: FastifyRequest<{ Body: { message: string; signature: ethers.SignatureLike } }>, res) => {
      try {
        const address = ethers.verifyMessage(req.body.message, req.body.signature);
        const token = jwt.sign({ sub: address }, secret, { expiresIn: '1h' });

        res.send({ token });
      } catch (err) {
        console.log(err);
        res.status(400).send();
      }
    },
  );

  done();
};
