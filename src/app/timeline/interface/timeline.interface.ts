import { User } from './user.interface';

export interface Timeline {
  content: string;
  id: number;
  published: string;
  user: User;
}
