import type { UserModel } from '$/commonTypesWithClient/models';
import { userModel } from '$/model/userModel';
import { userRepo } from '$/repository/userRepo';
import { transaction } from '$/service/prismaClient';
import type { UserRecord } from 'firebase-admin/lib/auth/user-record';

export const userUseCase = {
  findOrCreate: (userRecord: UserRecord) =>
    transaction<UserModel>('RepeatableRead', async (tx) => {
      const user = await userRepo.findById(tx, userRecord.uid);
      if (user !== null) return user;

      const newUser = userModel.create(userRecord);
      await userRepo.save(tx, newUser);

      return newUser;
    }),
};
