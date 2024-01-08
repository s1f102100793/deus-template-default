import type { UserId } from '$/commonTypesWithClient/ids';
import type { UserModel } from '$/commonTypesWithClient/models';

export type JwtUser = { sub: UserId; email: string; role: 'authenticated' | 'anon' };

export const userModel = {
  create: (jwtUser: JwtUser): UserModel => {
    return {
      id: jwtUser.sub,
      email: jwtUser.email,
      name: jwtUser.sub.val.split('-')[0],
      createdTime: Date.now(),
    };
  },
};
