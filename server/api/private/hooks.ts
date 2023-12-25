import type { UserModel } from '$/commonTypesWithClient/models';
import { usersRepo } from '$/repository/usersRepo';
import { getUserRecord } from '$/service/firebaseAdmin';
import { prismaClient } from '$/service/prismaClient';
import { defineHooks } from './$relay';

export type AdditionalRequest = {
  user: UserModel;
};

export default defineHooks(() => ({
  preHandler: async (req, res) => {
    const user = await getUserRecord(req.cookies.session).then((user) =>
      user === null ? null : usersRepo.findById(prismaClient, user.uid)
    );

    if (user === null) {
      res.status(401).send();
      return;
    }

    req.user = user;
  },
}));
