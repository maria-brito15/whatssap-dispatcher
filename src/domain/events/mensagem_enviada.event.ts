// src/domain/events/mensagem_enviada.event.ts

import { StatusEntrega } from "../enums/status_entrega.enum";

/**
 * Evento de domínio disparado quando uma mensagem é enviada (ou falha).
 * Contém todas as informações relevantes sobre o envio da mensagem.
 *
 * @example
 * const event = new MensagemEnviadaEvent({
 *   entrega_id: 'entrega-123',
 *   campanha_id: 'campanha-456',
 *   contato_id: 'contato-789',
 *   telefone: '11999999999',
 *   status: StatusEntrega.ENVIADO,
 *   tentativa: 1,
 *   mensagem_id: 'msg-wpp-12345',
 * });
 * eventDispatcher.dispatch(event);
 */
export interface MensagemEnviadaEventProps {
  /** ID do registro de entrega (CampanhaContato ou equivalente) */
  entrega_id: string;
  /** ID da campanha (se for uma campanha) */
  campanha_id?: string | null;
  /** ID do fluxo (se for um fluxo) */
  fluxo_id?: string | null;
  /** ID do contato */
  contato_id: string;
  /** Telefone do contato */
  telefone: string;
  /** Status do envio */
  status: StatusEntrega;
  /** Número da tentativa (1 = primeira) */
  tentativa: number;
  /** ID da mensagem no WhatsApp (opcional, apenas se enviado) */
  mensagem_id?: string | null;
  /** Mensagem de erro (opcional, apenas se falhou) */
  erro?: string | null;
}

export class MensagemEnviadaEvent {
  public readonly nome: string = "mensagem.enviada";
  public readonly ocorrido_em: Date;
  public readonly entrega_id: string;
  public readonly campanha_id: string | null;
  public readonly fluxo_id: string | null;
  public readonly contato_id: string;
  public readonly telefone: string;
  public readonly status: StatusEntrega;
  public readonly tentativa: number;
  public readonly mensagem_id: string | null;
  public readonly erro: string | null;

  constructor(props: MensagemEnviadaEventProps) {
    this.entrega_id = props.entrega_id;
    this.campanha_id = props.campanha_id ?? null;
    this.fluxo_id = props.fluxo_id ?? null;
    this.contato_id = props.contato_id;
    this.telefone = props.telefone;
    this.status = props.status;
    this.tentativa = props.tentativa;
    this.mensagem_id = props.mensagem_id ?? null;
    this.erro = props.erro ?? null;
    this.ocorrido_em = new Date();
  }

  /**
   * Verifica se a mensagem foi enviada com sucesso.
   */
  get foi_enviada(): boolean {
    return this.status === StatusEntrega.ENVIADO;
  }

  /**
   * Verifica se a mensagem falhou.
   */
  get falhou(): boolean {
    return this.status === StatusEntrega.FALHOU;
  }

  /**
   * Verifica se é uma mensagem de campanha.
   */
  get eh_campanha(): boolean {
    return this.campanha_id !== null;
  }

  /**
   * Verifica se é uma mensagem de fluxo.
   */
  get eh_fluxo(): boolean {
    return this.fluxo_id !== null;
  }

  /**
   * Converte o evento para um objeto JSON (útil para logging).
   */
  toJSON() {
    return {
      nome: this.nome,
      ocorrido_em: this.ocorrido_em.toISOString(),
      entrega_id: this.entrega_id,
      campanha_id: this.campanha_id,
      fluxo_id: this.fluxo_id,
      contato_id: this.contato_id,
      telefone: this.telefone,
      status: this.status,
      tentativa: this.tentativa,
      mensagem_id: this.mensagem_id,
      erro: this.erro,
    };
  }
}
