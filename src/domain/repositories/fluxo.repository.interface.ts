// src/domain/repositories/fluxo.repository.interface.ts

import { Fluxo } from "../entities/fluxo.entity";
import { ExecucaoFluxo } from "../entities/fluxo_execucao.entity";
import { StatusExecucaoFluxo } from "../enums/status_execucao_fluxo.enum";

export interface FluxoRepository {
  salvar(fluxo: Fluxo): Promise<Fluxo>;

  buscar_por_id(id: string): Promise<Fluxo | null>;

  listar_todos(opts?: {
    limite?: number;
    offset?: number;
    filtros?: {
      nome?: string;
      incluir_deletados?: boolean;
    };
  }): Promise<Fluxo[]>;

  buscar_por_nome(nome: string): Promise<Fluxo | null>;

  deletar(id: string): Promise<void>;

  restaurar(id: string): Promise<void>;

  buscar_execucoes_por_fluxo(
    fluxo_id: string,
    opts?: {
      status?: StatusExecucaoFluxo;
      limite?: number;
      offset?: number;
    },
  ): Promise<ExecucaoFluxo[]>;

  buscar_execucoes_por_contato(
    contato_id: string,
    opts?: {
      status?: StatusExecucaoFluxo;
      limite?: number;
      offset?: number;
    },
  ): Promise<ExecucaoFluxo[]>;

  buscar_execucao_por_id(execucao_id: string): Promise<ExecucaoFluxo | null>;

  salvar_execucao(execucao: ExecucaoFluxo): Promise<ExecucaoFluxo>;

  buscar_execucoes_pendentes(limite?: number): Promise<ExecucaoFluxo[]>;
}
