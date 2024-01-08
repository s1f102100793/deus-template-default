import type { UserModel } from '$/commonTypes/models';
import type { JwtUser } from '$/model/userModel';
import { userModel } from '$/model/userModel';
import { userRepo } from '$/repository/userRepo';
import { transaction } from '$/service/prismaClient';

export const userUseCase = {
  findOrCreate: (jwtUser: JwtUser) =>
    transaction<UserModel>('RepeatableRead', async (tx) => {
      const user = await userRepo.findById(tx, { type: 'User', val: jwtUser.sub });
      if (user !== null) return user;

      const newUser = userModel.create(jwtUser);
      await userRepo.save(tx, newUser);

      return newUser;
    }),
};
