import FakeUsersRepository from '../repository/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'example@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const email = 'example@example.com';

    await createUser.execute({
      name: 'John Doe',
      password: '123456',
      email,
    });

    expect(
      createUser.execute({
        name: 'John Doe 2',
        password: '1234567',
        email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
