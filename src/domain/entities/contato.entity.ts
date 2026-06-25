// src/domain/entities/contato.entity.ts

import { Telefone } from "../value-objects/telefone.vo";

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

  atualizar_nome(novo_nome: string): void {
    const nome_limpo = novo_nome.trim();

    if (!nome_limpo) {
      throw new Error("O nome não pode ser vazio.");
    }

    this._nome = nome_limpo;
    this._atualizado_em = new Date();
  }

  soft_delete(): void {
    if (this.esta_deletado) return;
    this._deletado_em = new Date();
    this._atualizado_em = new Date();
  }

  restaurar(): void {
    if (!this.esta_deletado) return;

    this._deletado_em = null;
    this._atualizado_em = new Date();
  }

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
