// src/domain/repositories/contato.repository.interface.ts

import { Contato } from "../entities/contato.entity";
import { Telefone } from "../value-objects/telefone.vo";

export interface ContatoRepository {
  salvar(contato: Contato): Promise<Contato>;

  buscar_por_id(id: string): Promise<Contato | null>;

  buscar_todos(opts?: {
    limite?: number;
    offset?: number;
    filtros?: {
      nome?: string;
      telefone?: string;
      incluir_deletados?: boolean;
    };
  }): Promise<Contato[]>;

  buscar_por_telefone(telefone: Telefone | string): Promise<Contato | null>;

  buscar_ativos(): Promise<Contato[]>;

  buscar_deletados(): Promise<Contato[]>;

  deletar(id: string): Promise<void>;

  restaurar(id: string): Promise<void>;
}
