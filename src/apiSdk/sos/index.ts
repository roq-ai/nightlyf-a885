import axios from 'axios';
import queryString from 'query-string';
import { SosInterface, SosGetQueryInterface } from 'interfaces/sos';
import { GetQueryInterface } from '../../interfaces';

export const getSos = async (query?: SosGetQueryInterface) => {
  const response = await axios.get(`/api/sos${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSos = async (sos: SosInterface) => {
  const response = await axios.post('/api/sos', sos);
  return response.data;
};

export const updateSosById = async (id: string, sos: SosInterface) => {
  const response = await axios.put(`/api/sos/${id}`, sos);
  return response.data;
};

export const getSosById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sos/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSosById = async (id: string) => {
  const response = await axios.delete(`/api/sos/${id}`);
  return response.data;
};
