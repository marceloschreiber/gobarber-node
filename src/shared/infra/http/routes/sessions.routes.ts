import { Router } from 'express';

import AuthenticaUserService from '../../../../modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticaUserService = new AuthenticaUserService();

  const { user, token } = await authenticaUserService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
