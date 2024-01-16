import type { User } from '$/api/@types';
import { userModel } from '$/domain/model/userModel';
import { userRepo } from '$/domain/repository/userRepo';
import { transaction } from '$/service/prismaClient';
import assert from 'assert';
import { defineController } from './$relay';

export default defineController(() => ({
  post: {
    hooks: {
      preValidation: async (req) => {
        await transaction<User>('RepeatableRead', async (tx) => {
          assert(req.jwtUser);
          const user = await userRepo.findById(tx, req.jwtUser.sub);
          if (user !== null) return user;

          const newUser = userModel.create(req.jwtUser);
          await userRepo.save(tx, newUser);

          return newUser;
        });
      },
    },
    handler: ({ user }) => ({ status: 200, body: user }),
  },
}));
