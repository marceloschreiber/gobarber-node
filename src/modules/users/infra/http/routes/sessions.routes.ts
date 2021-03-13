import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticaUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticaUserService = container.resolve(AuthenticaUserService);

  const { user, token } = await authenticaUserService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
