// src/domain/entities/contato.entity.ts

import { Telefone } from "../value-objects/telefone.vo";

/**
 * Entidade Contato (destinatário de mensagens).
 * Contém dados básicos do contato e o telefone como Value Object.
 *
 * @example
 * const telefone = Telefone.criar('11999999999');
 * const contato = new Contato({ nome: 'João Silva', telefone });
 * contato.atualizarNome('João Souza');
 * contato.softDelete();
 */
export interface ContatoProps {
  id?: string;
  nome: string;
  telefone: Telefone;
  criado_em?: Date;
  atualizado_em?: Date;
  deletado_em?: Date | null;
}

export class Contato {
  private readonly _id: string;
  private _nome: string;
  private readonly _telefone: Telefone;
  private _criado_em: Date;
  private _atualizado_em: Date;
  private _deletado_em: Date | null;

  constructor(props: ContatoProps) {
    this._id = props.id ?? crypto.randomUUID();
    this._nome = props.nome;
    this._telefone = props.telefone;
    this._criado_em = props.criado_em ?? new Date();
    this._atualizado_em = props.atualizado_em ?? new Date();
    this._deletado_em = props.deletado_em ?? null;

    this.validar();
  }

  private validar(): void {
    if (!this._nome || this._nome.trim().length === 0) {
      throw new Error("O nome do contato não pode ser vazio.");
    }
  }

  // ============================
  // GETTERS
  // ============================

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get telefone(): Telefone {
    return this._telefone;
  }

  get criado_em(): Date {
    return this._criado_em;
  }

  get atualizado_em(): Date {
    return this._atualizado_em;
  }

  get deletado_em(): Date | null {
    return this._deletado_em;
  }

  get esta_deletado(): boolean {
    return this._deletado_em !== null;
  }

  // ============================
  // MÉTODOS DE NEGÓCIO
  // ============================

  /**
   * Atualiza o nome do contato.
   * @param novo_nome Novo nome (não pode ser vazio)
   */
  atualizarNome(novo_nome: string): void {
    const nome_limpo = novo_nome.trim();
    if (!nome_limpo) {
      throw new Error("O nome não pode ser vazio.");
    }
    this._nome = nome_limpo;
    this._atualizado_em = new Date();
  }

  /**
   * Realiza soft delete do contato (marca como deletado).
   */
  softDelete(): void {
    if (this.esta_deletado) return;
    this._deletado_em = new Date();
    this._atualizado_em = new Date();
  }

  /**
   * Restaura um contato que foi deletado (soft delete).
   */
  restaurar(): void {
    if (!this.esta_deletado) return;
    this._deletado_em = null;
    this._atualizado_em = new Date();
  }

  // ============================
  // UTILITÁRIOS
  // ============================

  toJSON() {
    return {
      id: this._id,
      nome: this._nome,
      telefone: this._telefone.toString(),
      criado_em: this._criado_em.toISOString(),
      atualizado_em: this._atualizado_em.toISOString(),
      deletado_em: this._deletado_em?.toISOString() ?? null,
    };
  }
}
