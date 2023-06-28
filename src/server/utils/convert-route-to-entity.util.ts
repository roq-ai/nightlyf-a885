const mapping: Record<string, string> = {
  events: 'event',
  'guest-lists': 'guest_list',
  'party-streaks': 'party_streak',
  rsvps: 'rsvp',
  sos: 'sos',
  students: 'student',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
