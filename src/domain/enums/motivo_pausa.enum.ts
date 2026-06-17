// src/domain/enums/motivo_pausa.enum.ts

/**
 * Motivo pelo qual uma execução de fluxo foi pausada.
 * Usado para decidir se a reconciliação deve reativar automaticamente.
 *
 * @enum {string}
 */
export enum MotivoPausa {
  /** Pausado por falha no envio (pode ser reativado) */
  FALHA = "falha",
  /** Pausado manualmente pelo usuário (NÃO reativar automaticamente) */
  MANUAL = "manual",
  /** Pausado por abandono (agendador travou, worker não processou) */
  ABANDONADO = "abandonado",
}
