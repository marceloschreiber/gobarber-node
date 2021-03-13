import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticaUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticaUserService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
