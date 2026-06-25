// src/domain/entities/fluxo.entity.ts

import { PassoFluxo } from "./fluxo_passo.entity";
import { ExecucaoFluxo } from "./fluxo_execucao.entity";

export interface FluxoProps {
  id?: string;
  nome: string;
  criado_em?: Date;
  atualizado_em?: Date;
  deletado_em?: Date | null;
  criado_por?: string | null;
  passos?: PassoFluxo[];
  execucoes?: ExecucaoFluxo[];
}

export class Fluxo {
  private readonly _id: string;
  private _nome: string;
  private _criado_em: Date;
  private _atualizado_em: Date;
  private _deletado_em: Date | null;
  private _criado_por: string | null;
  private _passos: PassoFluxo[];
  private _execucoes: ExecucaoFluxo[];

  constructor(props: FluxoProps) {
    this._id = props.id ?? crypto.randomUUID();
    this._nome = props.nome;
    this._criado_em = props.criado_em ?? new Date();
    this._atualizado_em = props.atualizado_em ?? new Date();
    this._deletado_em = props.deletado_em ?? null;
    this._criado_por = props.criado_por ?? null;
    this._passos = props.passos ?? [];
    this._execucoes = props.execucoes ?? [];

    this.validar();
  }

  private validar(): void {
    if (!this._nome || this._nome.trim().length === 0) {
      throw new Error("O nome do fluxo não pode ser vazio.");
    }
  }

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
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

  get criado_por(): string | null {
    return this._criado_por;
  }

  get passos(): PassoFluxo[] {
    return [...this._passos];
  }

  get execucoes(): ExecucaoFluxo[] {
    return [...this._execucoes];
  }

  get esta_deletado(): boolean {
    return this._deletado_em !== null;
  }

  get quantidade_passos(): number {
    return this._passos.length;
  }

  get primeiro_passo(): PassoFluxo | undefined {
    return this._passos.length > 0 ? this._passos[0] : undefined;
  }

  atualizar_nome(novo_nome: string): void {
    const nome_limpo = novo_nome.trim();
    if (!nome_limpo) {
      throw new Error("O nome do fluxo não pode ser vazio.");
    }
    this._nome = nome_limpo;
    this._atualizado_em = new Date();
  }

  adicionar_passo(passo: PassoFluxo): void {
    const existe = this._passos.some((p) => p.ordem === passo.ordem);

    if (existe) {
      throw new Error(
        `Já existe um passo com ordem ${passo.ordem} neste fluxo.`,
      );
    }

    this._passos.push(passo);
    this._passos.sort((a, b) => a.ordem - b.ordem);
    this._atualizado_em = new Date();
  }

  remover_passo(ordem: number): void {
    const index = this._passos.findIndex((p) => p.ordem === ordem);
    if (index === -1) {
      throw new Error(`Passo com ordem ${ordem} não encontrado.`);
    }
    this._passos.splice(index, 1);
    this._atualizado_em = new Date();
  }

  buscar_passo_por_ordem(ordem: number): PassoFluxo | undefined {
    return this._passos.find((p) => p.ordem === ordem);
  }

  proximoPasso(ordem_atual: number): PassoFluxo | undefined {
    return this._passos.find((p) => p.ordem > ordem_atual);
  }

  tem_passos(): boolean {
    return this._passos.length > 0;
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

  definir_criador(usuario_id: string): void {
    this._criado_por = usuario_id;
    this._atualizado_em = new Date();
  }

  toJSON() {
    return {
      id: this._id,
      nome: this._nome,
      criado_em: this._criado_em.toISOString(),
      atualizado_em: this._atualizado_em.toISOString(),
      deletado_em: this._deletado_em?.toISOString() ?? null,
      criado_por: this._criado_por,
      passos: this._passos.map((p) => p.toJSON()),
      execucoes: this._execucoes.map((e) => e.toJSON()),
    };
  }
}
