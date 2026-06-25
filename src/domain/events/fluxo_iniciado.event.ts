// src/domain/events/fluxo_iniciado.event.ts

import { Fluxo } from "../entities/fluxo.entity";

export class FluxoIniciadoEvent {
  public readonly nome: string = "fluxo.iniciado";
  public readonly ocorrido_em: Date;

  constructor(
    public readonly fluxo: Fluxo,
    public readonly contato_ids: string[],
    public readonly quantidade_contatos: number,
    public readonly force: boolean = false,
  ) {
    this.ocorrido_em = new Date();
  }

  get fluxo_id(): string {
    return this.fluxo.id;
  }

  get fluxo_nome(): string {
    return this.fluxo.nome;
  }

  get quantidade_passos(): number {
    return this.fluxo.quantidade_passos;
  }

  toJSON() {
    return {
      nome: this.nome,
      ocorrido_em: this.ocorrido_em.toISOString(),
      fluxo_id: this.fluxo_id,
      fluxo_nome: this.fluxo_nome,
      quantidade_contatos: this.quantidade_contatos,
      quantidade_passos: this.quantidade_passos,
      force: this.force,
    };
  }
}
