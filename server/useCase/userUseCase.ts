import type { UserModel } from '$/commonTypesWithClient/models';
import { userModel } from '$/model/userModel';
import { usersRepo } from '$/repository/usersRepo';
import { transaction } from '$/service/prismaClient';
import type { UserRecord } from 'firebase-admin/lib/auth/user-record';

export const userUseCase = {
  findOrCreateUser: (userRecord: UserRecord) =>
    transaction<UserModel>(async (tx) => {
      const user = await usersRepo.findById(tx, userRecord.uid);
      if (user !== null) return user;

      const newUser = userModel.create(userRecord);
      await usersRepo.save(tx, newUser);

      return newUser;
    }, 'RepeatableRead'),
};
