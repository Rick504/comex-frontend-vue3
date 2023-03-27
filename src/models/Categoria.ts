import { v4 as uuidv4 } from 'uuid';
import type { Categoria } from '@/interfaces/index';

export const criarCategoria = (nome: string): Categoria => {
    return {
        id: uuidv4(),
        nome: nome,
        criacao: new Date().toISOString().substring(0, 10),
        status: 'Ativa'
    };
};





