interface Pessoa {
  id: string;
  nome: string;
}

export interface Carrinho {
  nome: string;
  preco: number;
  descricao?: string;
}

export interface Categoria extends Pessoa {
  criacao: string;
  status: string;
}

export interface Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
}

export interface Cliente extends Pessoa {
  sobrenome: string;
  cpf: string;
  telefone: string;
  endereco: Endereco;
  email: string;
}

export interface Produto extends Pessoa {
  descricao: string;
  preco: number;
  quantidade_estoque: number;
  categoria: string;
  url?: string;
  criacao: string;
}
