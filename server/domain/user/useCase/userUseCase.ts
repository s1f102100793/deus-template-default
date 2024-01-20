import type { User } from '$/api/@types';
import { transaction } from '$/service/prismaClient';
import type { JwtUser } from '../model/userModel';
import { userModel } from '../model/userModel';
import { userRepo } from '../repository/userRepo';

export const userUseCase = {
  findOrCreate: (jwtUser: JwtUser) =>
    transaction<User>('RepeatableRead', async (tx) => {
      const user = await userRepo.findById(tx, jwtUser.sub);
      if (user !== null) return user;

      const newUser = userModel.create(jwtUser);
      await userRepo.save(tx, newUser);

      return newUser;
    }),
};
