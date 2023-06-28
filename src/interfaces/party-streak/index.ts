import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PartyStreakInterface {
  id?: string;
  user_id?: string;
  streak_count?: number;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface PartyStreakGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
