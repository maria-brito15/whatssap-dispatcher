// src/domain/services/fluxo.service.interface.ts

import { Fluxo } from "../entities/fluxo.entity";
import { ExecucaoFluxo } from "../entities/fluxo_execucao.entity";
import { StatusExecucaoFluxo } from "../enums/status_execucao_fluxo.enum";
import { MotivoPausa } from "../enums/motivo_pausa.enum";

export interface FluxoService {
  criar_fluxo(
    nome: string,
    passos?: Array<{ mensagem: string; delay_segundos: number; ordem: number }>,
    criado_por?: string,
  ): Promise<Fluxo>;

  adicionar_passo(
    fluxo_id: string,
    mensagem: string,
    delay_segundos: number,
    ordem: number,
  ): Promise<Fluxo>;

  remover_passo(fluxo_id: string, ordem: number): Promise<Fluxo>;

  atualizar_nome(fluxo_id: string, novo_nome: string): Promise<Fluxo>;

  atualizar_passo(
    passo_id: string,
    mensagem?: string,
    delay?: number,
  ): Promise<Fluxo>;

  iniciar_fluxo(
    fluxo_id: string,
    contato_ids: string[],
    force?: boolean,
  ): Promise<void>;

  processar_proximo_passo(execucao_id: string): Promise<void>;

  processar_execucoes_pendentes(limite?: number): Promise<void>;

  pausar_execucao(execucao_id: string, motivo: MotivoPausa): Promise<void>;

  reativar_execucao(execucao_id: string): Promise<void>;

  concluir_execucao(execucao_id: string): Promise<void>;

  listar_fluxos(opts?: {
    nome?: string;
    incluirDeletados?: boolean;
    limite?: number;
    offset?: number;
  }): Promise<Fluxo[]>;

  buscar_fluxo_por_id(id: string): Promise<Fluxo | null>;

  buscar_execucao_por_id(execucao_id: string): Promise<ExecucaoFluxo | null>;

  listar_execucoes(
    fluxo_id?: string,
    contato_id?: string,
    status?: StatusExecucaoFluxo,
  ): Promise<ExecucaoFluxo[]>;
}
