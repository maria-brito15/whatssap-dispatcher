// src/domain/enums/status_entrega.enum.ts

/**
 * Status de uma tentativa de envio em uma campanha.
 * Representa o ciclo de vida de uma mensagem individual.
 *
 * @enum {string}
 */
export enum StatusEntrega {
  /** Aguardando agendamento (ainda não foi processado pelo agendador) */
  PENDENTE = "pendente",
  /** Tarefa enfileirada, aguardando processamento pelo worker */
  PROCESSANDO = "processando",
  /** Enviado com sucesso */
  ENVIADO = "enviado",
  /** Falha definitiva (após todas as tentativas) */
  FALHOU = "falhou",
}
