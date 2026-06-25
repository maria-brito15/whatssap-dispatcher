// src/domain/services/contato.service.interface.ts

import { Contato } from "../entities/contato.entity";
import { Telefone } from "../value-objects/telefone.vo";

export interface ContatoService {
  criar_contato(nome: string, telefone: string | Telefone): Promise<Contato>;

  atualizar_contato(id: string, nome: string): Promise<Contato>;

  deletar_contato(id: string): Promise<void>;

  restaurar_contato(id: string): Promise<void>;

  listar_contatos(opts?: {
    nome?: string;
    telefone?: string;
    incluir_deletados?: boolean;
    limite?: number;
    offset?: number;
  }): Promise<Contato[]>;

  buscar_contato_por_id(id: string): Promise<Contato | null>;

  buscar_contato_por_telefone(
    telefone: string | Telefone,
  ): Promise<Contato | null>;

  validar_telefone(telefone: string): boolean;
}
