import http from './http/api';
import type { Cliente } from '@/interfaces/index';

export default {
  insertClientes: async (params: Cliente) => {
    try {
      const data = await http.post(`clientes`, params);
      return data.data;
    } catch (err) {
      return await Promise.reject(err);
    }
  },
};
