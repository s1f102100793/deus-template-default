import type { UserModel } from '$/commonTypesWithClient/models';
import { githubIdParser, userIdParser } from '$/service/idParsers';
import type { Prisma, User } from '@prisma/client';

const toModel = (prismaUser: User): UserModel => ({
  id: userIdParser.parse(prismaUser.id),
  githubId: githubIdParser.parse(prismaUser.githubId),
  email: prismaUser.email,
  displayName: prismaUser.displayName ?? undefined,
  photoURL: prismaUser.photoURL ?? undefined,
  createdTime: prismaUser.createdAt.getTime(),
});

export const userRepo = {
  save: async (tx: Prisma.TransactionClient, user: UserModel) => {
    return tx.user.upsert({
      where: { id: user.id },
      update: { email: user.email, displayName: user.displayName, photoURL: user.photoURL },
      create: {
        id: user.id,
        githubId: user.githubId,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(user.createdTime),
      },
    });
  },
  findById: (tx: Prisma.TransactionClient, id: string): Promise<UserModel | null> =>
    tx.user.findUnique({ where: { id } }).then((user) => (user !== null ? toModel(user) : null)),
};
