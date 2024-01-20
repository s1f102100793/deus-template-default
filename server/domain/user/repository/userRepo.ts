import type { User } from '$/api/@types';
import type { Prisma, User as PrismaUser } from '@prisma/client';

const toModel = (prismaUser: PrismaUser): User => ({
  id: prismaUser.id,
  email: prismaUser.email,
  name: prismaUser.name,
});

export const userRepo = {
  save: async (tx: Prisma.TransactionClient, user: User) => {
    return tx.user.upsert({
      where: { id: user.id },
      update: { email: user.email, name: user.name },
      create: { id: user.id, email: user.email, name: user.name },
    });
  },
  findById: (tx: Prisma.TransactionClient, userId: string): Promise<User | null> =>
    tx.user
      .findUnique({ where: { id: userId } })
      .then((user) => (user !== null ? toModel(user) : null)),
};
