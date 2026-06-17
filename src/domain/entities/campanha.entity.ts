// src/domain/entities/campanha.entity.ts

import { DelayRange } from "../value-objects/intervalo_delay.vo";

/**
 * Entidade Campanha (disparo único em massa).
 *
 * @example
 * const delay = DelayRange.criar(2, 5);
 * const campanha = new Campanha({
 *   mensagem: 'Olá, bem-vindo!',
 *   delay_range: delay,
 * });
 * campanha.atualizarMensagem('Olá, obrigado por se cadastrar!');
 * campanha.marcarComoExecutada();
 */
export interface CampanhaProps {
  id?: string;
  mensagem: string;
  delay_range: DelayRange;
  criado_em?: Date;
  atualizado_em?: Date;
  criado_por?: string | null;
  executado_em?: Date | null;
}

export class Campanha {
  private readonly _id: string;
  private _mensagem: string;
  private readonly _delay_range: DelayRange;
  private _criado_em: Date;
  private _atualizado_em: Date;
  private _criado_por: string | null;
  private _executado_em: Date | null;

  constructor(props: CampanhaProps) {
    this._id = props.id ?? crypto.randomUUID();
    this._mensagem = props.mensagem;
    this._delay_range = props.delay_range;
    this._criado_em = props.criado_em ?? new Date();
    this._atualizado_em = props.atualizado_em ?? new Date();
    this._criado_por = props.criado_por ?? null;
    this._executado_em = props.executado_em ?? null;

    this.validar();
  }

  private validar(): void {
    if (!this._mensagem || this._mensagem.trim().length === 0) {
      throw new Error("A mensagem da campanha não pode ser vazia.");
    }
  }

  // ============================
  // GETTERS
  // ============================

  get id(): string {
    return this._id;
  }

  get mensagem(): string {
    return this._mensagem;
  }

  get delay_range(): DelayRange {
    return this._delay_range;
  }

  get criado_em(): Date {
    return this._criado_em;
  }

  get atualizado_em(): Date {
    return this._atualizado_em;
  }

  get criado_por(): string | null {
    return this._criado_por;
  }

  get executado_em(): Date | null {
    return this._executado_em;
  }

  get esta_executada(): boolean {
    return this._executado_em !== null;
  }

  // ============================
  // MÉTODOS DE NEGÓCIO
  // ============================

  /**
   * Atualiza a mensagem da campanha.
   * @param nova_mensagem Nova mensagem (não pode ser vazia)
   */
  atualizarMensagem(nova_mensagem: string): void {
    const mensagem_limpa = nova_mensagem.trim();
    if (!mensagem_limpa) {
      throw new Error("A mensagem não pode ser vazia.");
    }
    this._mensagem = mensagem_limpa;
    this._atualizado_em = new Date();
  }

  /**
   * Marca a campanha como executada (foi iniciada).
   */
  marcarComoExecutada(): void {
    this._executado_em = new Date();
    this._atualizado_em = new Date();
  }

  /**
   * Define quem criou a campanha (para auditoria).
   */
  definirCriador(usuario_id: string): void {
    this._criado_por = usuario_id;
    this._atualizado_em = new Date();
  }

  // ============================
  // UTILITÁRIOS
  // ============================

  toJSON() {
    return {
      id: this._id,
      mensagem: this._mensagem,
      delay_min: this._delay_range.min,
      delay_max: this._delay_range.max,
      criado_em: this._criado_em.toISOString(),
      atualizado_em: this._atualizado_em.toISOString(),
      criado_por: this._criado_por,
      executado_em: this._executado_em?.toISOString() ?? null,
    };
  }
}
