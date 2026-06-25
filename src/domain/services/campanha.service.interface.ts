// src/domain/services/campanha.service.interface.ts

import { Campanha } from "../entities/campanha.entity";
import { IntervaloDelay } from "../value-objects/intervalo_delay.vo";

export interface CampanhaService {
  criar_campanha(
    mensagem: string,
    intervalo_delay: IntervaloDelay | { min: number; max: number },
    criado_por?: string,
  ): Promise<Campanha>;

  atualizar_mensagem(id: string, nova_mensagem: string): Promise<Campanha>;

  iniciar_campanha(
    campanha_id: string,
    contato_ids: string[],
    force?: boolean,
  ): Promise<void>;

  marcar_como_executada(id: string): Promise<Campanha>;

  listar_campanhas(opts?: {
    mensagem?: string;
    executada?: boolean;
    limite?: number;
    offset?: number;
  }): Promise<Campanha[]>;

  buscar_campanha_por_id(id: string): Promise<Campanha | null>;
}
