// src/domain/enums/status_execucao_fluxo.enum.ts

/**
 * Status da execução de um fluxo para um contato específico.
 *
 * @enum {string}
 */
export enum StatusExecucaoFluxo {
  /** Fluxo em andamento, o agendador deve processar */
  ATIVO = "ativo",
  /** Interrompido (por falha ou manualmente) */
  PAUSADO = "pausado",
  /** Todas as etapas concluídas */
  CONCLUIDO = "concluido",
}
