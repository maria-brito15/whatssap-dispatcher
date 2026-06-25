// src/domain/repositories/campanha.repository.interface.ts

import { Campanha } from "../entities/campanha.entity";

export interface CampanhaRepository {
  salvar(campanha: Campanha): Promise<Campanha>;

  buscar_por_id(id: string): Promise<Campanha | null>;

  listar_todos(opts?: {
    limite?: number;
    offset?: number;
    filtros?: {
      mensagem?: string;
      executada?: boolean;
    };
  }): Promise<Campanha[]>;

  buscar_nao_executadas(): Promise<Campanha[]>;

  deletar(id: string): Promise<void>;
}
