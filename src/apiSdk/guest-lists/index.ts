import axios from 'axios';
import queryString from 'query-string';
import { GuestListInterface, GuestListGetQueryInterface } from 'interfaces/guest-list';
import { GetQueryInterface } from '../../interfaces';

export const getGuestLists = async (query?: GuestListGetQueryInterface) => {
  const response = await axios.get(`/api/guest-lists${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGuestList = async (guestList: GuestListInterface) => {
  const response = await axios.post('/api/guest-lists', guestList);
  return response.data;
};

export const updateGuestListById = async (id: string, guestList: GuestListInterface) => {
  const response = await axios.put(`/api/guest-lists/${id}`, guestList);
  return response.data;
};

export const getGuestListById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/guest-lists/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGuestListById = async (id: string) => {
  const response = await axios.delete(`/api/guest-lists/${id}`);
  return response.data;
};
