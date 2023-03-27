import { v4 as uuidv4 } from 'uuid';
import type { Endereco, Cliente } from '@/interfaces/index';

export const criarCliente = (
  nome: string,
  sobrenome: string,
  email: string,
  cpf: string,
  telefone: string,
  endereco: Endereco
): Cliente => {
  return {
    id: uuidv4(),
    nome: nome,
    sobrenome: sobrenome,
    cpf: cpf,
    telefone: telefone,
    endereco: endereco,
    email: email,
  };
};
