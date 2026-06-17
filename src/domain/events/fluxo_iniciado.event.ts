// src/domain/events/fluxo_iniciado.event.ts

import { Fluxo } from "../entities/fluxo.entity";

/**
 * Evento de domínio disparado quando um fluxo é iniciado.
 * Contém todas as informações relevantes sobre o início do fluxo.
 *
 * @example
 * const event = new FluxoIniciadoEvent(fluxo, contato_ids, quantidade);
 * eventDispatcher.dispatch(event);
 */
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

  /**
   * Retorna o ID do fluxo.
   */
  get fluxo_id(): string {
    return this.fluxo.id;
  }

  /**
   * Retorna o nome do fluxo.
   */
  get fluxo_nome(): string {
    return this.fluxo.nome;
  }

  /**
   * Retorna a quantidade de passos do fluxo.
   */
  get quantidade_passos(): number {
    return this.fluxo.quantidade_passos;
  }

  /**
   * Converte o evento para um objeto JSON (útil para logging).
   */
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
