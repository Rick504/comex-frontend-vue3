import { v4 as uuidv4 } from 'uuid';
import type { Produto } from '@/interfaces/index';

export const criarProduto = (
  nome: string,
  descricao: string,
  preco: number,
  quantidade_estoque: number,
  categoria: string,
  url: string
): Produto => {
  return {
    id: uuidv4(),
    nome: nome,
    descricao: descricao,
    preco: preco,
    quantidade_estoque: quantidade_estoque,
    categoria: categoria,
    url: url,
    criacao: new Date().toISOString().substring(0, 10),
  };
};
