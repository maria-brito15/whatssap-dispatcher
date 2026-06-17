// src/domain/entities/fluxo_passo.entity.ts

/**
 * Entidade Passo (etapa) de um fluxo.
 *
 * @example
 * const passo = new PassoFluxo({
 *   fluxo_id: 'fluxo-123',
 *   mensagem: 'Bem-vindo ao nosso sistema!',
 *   delay_segundos: 0,
 *   ordem: 1,
 * });
 * passo.atualizarDelay(120); // altera delay para 2 minutos
 */
export interface PassoFluxoProps {
  id?: string;
  fluxo_id: string;
  mensagem: string;
  delay_segundos: number;
  ordem: number;
  criado_em?: Date;
  atualizado_em?: Date;
}

export class PassoFluxo {
  private readonly _id: string;
  private readonly _fluxo_id: string;
  private _mensagem: string;
  private _delay_segundos: number;
  private readonly _ordem: number;
  private _criado_em: Date;
  private _atualizado_em: Date;

  constructor(props: PassoFluxoProps) {
    this._id = props.id ?? crypto.randomUUID();
    this._fluxo_id = props.fluxo_id;
    this._mensagem = props.mensagem;
    this._delay_segundos = props.delay_segundos;
    this._ordem = props.ordem;
    this._criado_em = props.criado_em ?? new Date();
    this._atualizado_em = props.atualizado_em ?? new Date();

    this.validar();
  }

  private validar(): void {
    if (!this._mensagem || this._mensagem.trim().length === 0) {
      throw new Error("A mensagem do passo não pode ser vazia.");
    }
    if (this._delay_segundos < 0) {
      throw new Error("O delay não pode ser negativo.");
    }
    if (this._ordem < 1) {
      throw new Error("A ordem do passo deve ser maior ou igual a 1.");
    }
  }

  // ============================
  // GETTERS
  // ============================

  get id(): string {
    return this._id;
  }

  get fluxo_id(): string {
    return this._fluxo_id;
  }

  get mensagem(): string {
    return this._mensagem;
  }

  get delay_segundos(): number {
    return this._delay_segundos;
  }

  get ordem(): number {
    return this._ordem;
  }

  get criado_em(): Date {
    return this._criado_em;
  }

  get atualizado_em(): Date {
    return this._atualizado_em;
  }

  // ============================
  // MÉTODOS DE NEGÓCIO
  // ============================

  /**
   * Atualiza a mensagem do passo.
   */
  atualizarMensagem(nova_mensagem: string): void {
    const mensagem_limpa = nova_mensagem.trim();
    if (!mensagem_limpa) {
      throw new Error("A mensagem do passo não pode ser vazia.");
    }
    this._mensagem = mensagem_limpa;
    this._atualizado_em = new Date();
  }

  /**
   * Atualiza o delay do passo.
   */
  atualizarDelay(novo_delay: number): void {
    if (novo_delay < 0) {
      throw new Error("O delay não pode ser negativo.");
    }
    this._delay_segundos = novo_delay;
    this._atualizado_em = new Date();
  }

  // ============================
  // UTILITÁRIOS
  // ============================

  toJSON() {
    return {
      id: this._id,
      fluxo_id: this._fluxo_id,
      mensagem: this._mensagem,
      delay_segundos: this._delay_segundos,
      ordem: this._ordem,
      criado_em: this._criado_em.toISOString(),
      atualizado_em: this._atualizado_em.toISOString(),
    };
  }
}
