import { FastifyPluginCallback } from 'fastify';
import { isAuthenticated } from '../../common/hooks/auth.middleware';
import { DeleteGuardianBody, DeleteGuardianDto, Guardian, GuardianBody, GuardianDto } from './guardian.schema';

export const GuardiansController: FastifyPluginCallback = (fastify, _, done) => {
  fastify.addHook('onRequest', isAuthenticated);

  fastify.post<{ Body: GuardianDto }>('/', { schema: { body: GuardianBody } }, async (req, res) => {
    await new Guardian({ ...req.body, safeguarded: req.user.address }).save();
    res.status(201).send();
  });

  fastify.get('/', async (req, res) => {
    const guardians = await Guardian.find({ safeguarded: req.user.address });
    res.status(200).send({ guardians });
  });

  fastify.delete<{ Body: DeleteGuardianDto }>('/', { schema: { body: DeleteGuardianBody } }, async (req, res) => {
    await Guardian.deleteMany({ safeguarded: req.user.address, guardian: req.body.deleteAddress });
    res.status(204).send();
  });

   fastify.delete<{ Body: DeleteGuardianDto }>('/safeguarded', { schema: { body: DeleteGuardianBody } }, async (req, res) => {
     await Guardian.deleteMany({ safeguarded: req.body.deleteAddress, guardian: req.user.address });
     res.status(204).send();
   });

  fastify.get('/safeguarded', async (req, res) => {
    const safeguarded = await Guardian.find({ guardian: req.user.address });
    res.status(200).send({ safeguarded });
  });

  done();
};
