import { GuestListInterface } from 'interfaces/guest-list';
import { RsvpInterface } from 'interfaces/rsvp';
import { SosInterface } from 'interfaces/sos';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EventInterface {
  id?: string;
  name: string;
  description?: string;
  tags?: string;
  media?: string;
  organizer_id?: string;
  created_at?: any;
  updated_at?: any;
  guest_list?: GuestListInterface[];
  rsvp?: RsvpInterface[];
  sos?: SosInterface[];
  user?: UserInterface;
  _count?: {
    guest_list?: number;
    rsvp?: number;
    sos?: number;
  };
}

export interface EventGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  tags?: string;
  media?: string;
  organizer_id?: string;
}
