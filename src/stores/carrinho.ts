import { defineStore } from 'pinia';
import type { Carrinho } from '@/interfaces/index';

export const useCarrinhoStore = defineStore({
  // nome do módulo do store
  id: 'carrinho',
  // estado inicial
  state: () => ({
    produtos: [] as Carrinho[],
  }),
  // getters computados
  getters: {
    precoTotal(): number {
      return this.produtos.reduce(
        (previous, current) => previous + current.preco,
        0
      );
    },
  },
  // ações para atualizar o estado
  actions: {
    incrementProduto(item: Carrinho) {
      this.produtos.push(item);
    },
  },
});
