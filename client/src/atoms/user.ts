import { atom } from 'jotai';
import type { UserModel } from 'src/commonTypes/models';

export const userAtom = atom<UserModel | null>(null);
