// src/domain/events/mensagem_enviada.event.ts

import { StatusEntrega } from "../enums/status_entrega.enum";

export interface MensagemEnviadaEventProps {
  entrega_id: string;
  campanha_id?: string | null;
  fluxo_id?: string | null;
  contato_id: string;
  telefone: string;
  status: StatusEntrega;
  tentativa: number;
  mensagem_id?: string | null;
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

  get foi_enviada(): boolean {
    return this.status === StatusEntrega.ENVIADO;
  }

  get falhou(): boolean {
    return this.status === StatusEntrega.FALHOU;
  }

  get eh_campanha(): boolean {
    return this.campanha_id !== null;
  }

  get eh_fluxo(): boolean {
    return this.fluxo_id !== null;
  }

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
