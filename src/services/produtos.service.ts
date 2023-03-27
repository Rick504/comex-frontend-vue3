import http from './http/api';

export default {
  getProdutos: async () => {
    try {
      const data = await http.get(`produtos`);
      return data.data;
    } catch (err) {
      return await Promise.reject(err);
    }
  },

  insertProdutos: async (params: any) => {
    try {
      const data = await http.post(`produtos`, params);
      alert('Produto cadastrado com sucesso!!');
      return data.data;
    } catch (err) {
      return await Promise.reject(err);
    }
  },
};
