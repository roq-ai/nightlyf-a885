import axios from 'axios';
import queryString from 'query-string';
import { PartyStreakInterface, PartyStreakGetQueryInterface } from 'interfaces/party-streak';
import { GetQueryInterface } from '../../interfaces';

export const getPartyStreaks = async (query?: PartyStreakGetQueryInterface) => {
  const response = await axios.get(`/api/party-streaks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPartyStreak = async (partyStreak: PartyStreakInterface) => {
  const response = await axios.post('/api/party-streaks', partyStreak);
  return response.data;
};

export const updatePartyStreakById = async (id: string, partyStreak: PartyStreakInterface) => {
  const response = await axios.put(`/api/party-streaks/${id}`, partyStreak);
  return response.data;
};

export const getPartyStreakById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/party-streaks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePartyStreakById = async (id: string) => {
  const response = await axios.delete(`/api/party-streaks/${id}`);
  return response.data;
};
