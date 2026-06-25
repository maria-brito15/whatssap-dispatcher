// src/domain/entities/fluxo_execucao.entity.ts

import { StatusExecucaoFluxo } from "../enums/status_execucao_fluxo.enum";
import { MotivoPausa } from "../enums/motivo_pausa.enum";

export interface ExecucaoFluxoProps {
  id?: string;
  fluxo_id: string;
  contato_id: string;
  passo_atual: number;
  status: StatusExecucaoFluxo;
  motivo_pausa?: MotivoPausa | null;
  proxima_execucao_em: Date;
  ultima_mensagem_id?: string | null;
  criado_em?: Date;
  atualizado_em?: Date;
}

export class ExecucaoFluxo {
  private readonly _id: string;
  private readonly _fluxo_id: string;
  private readonly _contato_id: string;
  private _passo_atual: number;
  private _status: StatusExecucaoFluxo;
  private _motivo_pausa: MotivoPausa | null;
  private _proxima_execucao_em: Date;
  private _ultima_mensagem_id: string | null;
  private _criado_em: Date;
  private _atualizado_em: Date;

  constructor(props: ExecucaoFluxoProps) {
    this._id = props.id ?? crypto.randomUUID();
    this._fluxo_id = props.fluxo_id;
    this._contato_id = props.contato_id;
    this._passo_atual = props.passo_atual;
    this._status = props.status;
    this._motivo_pausa = props.motivo_pausa ?? null;
    this._proxima_execucao_em = props.proxima_execucao_em;
    this._ultima_mensagem_id = props.ultima_mensagem_id ?? null;
    this._criado_em = props.criado_em ?? new Date();
    this._atualizado_em = props.atualizado_em ?? new Date();

    this.validar();
  }

  private validar(): void {
    if (this._passo_atual < 1) {
      throw new Error("O passo atual deve ser maior ou igual a 1.");
    }

    if (this._status === StatusExecucaoFluxo.PAUSADO && !this._motivo_pausa) {
      throw new Error(
        "Uma execução pausada deve ter um motivo de pausa informado.",
      );
    }
  }

  get id(): string {
    return this._id;
  }

  get fluxo_id(): string {
    return this._fluxo_id;
  }

  get contato_id(): string {
    return this._contato_id;
  }

  get passo_atual(): number {
    return this._passo_atual;
  }

  get status(): StatusExecucaoFluxo {
    return this._status;
  }

  get motivo_pausa(): MotivoPausa | null {
    return this._motivo_pausa;
  }

  get proxima_execucao_em(): Date {
    return this._proxima_execucao_em;
  }

  get ultima_mensagem_id(): string | null {
    return this._ultima_mensagem_id;
  }

  get criado_em(): Date {
    return this._criado_em;
  }

  get atualizado_em(): Date {
    return this._atualizado_em;
  }

  get esta_ativo(): boolean {
    return this._status === StatusExecucaoFluxo.ATIVO;
  }

  get esta_pausado(): boolean {
    return this._status === StatusExecucaoFluxo.PAUSADO;
  }

  get esta_concluido(): boolean {
    return this._status === StatusExecucaoFluxo.CONCLUIDO;
  }

  get pode_reativar_automaticamente(): boolean {
    return this.esta_pausado && this._motivo_pausa !== MotivoPausa.MANUAL;
  }

  avancar_passo(novo_passo: number): void {
    if (novo_passo <= this._passo_atual) {
      throw new Error(
        `O novo passo (${novo_passo}) deve ser maior que o atual (${this._passo_atual}).`,
      );
    }

    this._passo_atual = novo_passo;
    this._status = StatusExecucaoFluxo.ATIVO;
    this._motivo_pausa = null;
    this._atualizado_em = new Date();
  }

  agendar_proximo(data_proxima: Date): void {
    const agora = new Date();

    if (data_proxima <= agora) {
      throw new Error("A próxima execução deve ser no futuro.");
    }

    this._proxima_execucao_em = data_proxima;
    this._status = StatusExecucaoFluxo.ATIVO;
    this._motivo_pausa = null;
    this._atualizado_em = new Date();
  }

  pausar(motivo: MotivoPausa): void {
    this._status = StatusExecucaoFluxo.PAUSADO;
    this._motivo_pausa = motivo;
    this._atualizado_em = new Date();
  }

  reativar(): void {
    if (!this.esta_pausado) {
      throw new Error(
        "Não é possível reativar uma execução que não está pausada.",
      );
    }

    this._status = StatusExecucaoFluxo.ATIVO;
    this._motivo_pausa = null;
    this._atualizado_em = new Date();
  }

  concluir(): void {
    this._status = StatusExecucaoFluxo.CONCLUIDO;
    this._motivo_pausa = null;
    this._atualizado_em = new Date();
  }

  registrar_ultima_mensagem(mensagem_id: string): void {
    this._ultima_mensagem_id = mensagem_id;
    this._atualizado_em = new Date();
  }

  toJSON() {
    return {
      id: this._id,
      fluxo_id: this._fluxo_id,
      contato_id: this._contato_id,
      passo_atual: this._passo_atual,
      status: this._status,
      motivo_pausa: this._motivo_pausa,
      proxima_execucao_em: this._proxima_execucao_em.toISOString(),
      ultima_mensagem_id: this._ultima_mensagem_id,
      criado_em: this._criado_em.toISOString(),
      atualizado_em: this._atualizado_em.toISOString(),
    };
  }
}
