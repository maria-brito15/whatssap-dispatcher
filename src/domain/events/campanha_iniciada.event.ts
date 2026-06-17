// src/domain/events/campanha_iniciada.event.ts

import { Campanha } from "../entities/campanha.entity";

/**
 * Evento de domínio disparado quando uma campanha é iniciada.
 * Contém todas as informações relevantes sobre o início da campanha.
 *
 * @example
 * const event = new CampanhaIniciadaEvent(campanha, contato_ids, quantidade);
 * eventDispatcher.dispatch(event);
 */
export class CampanhaIniciadaEvent {
  public readonly nome: string = "campanha.iniciada";
  public readonly ocorrido_em: Date;

  constructor(
    public readonly campanha: Campanha,
    public readonly contato_ids: string[],
    public readonly quantidade_contatos: number,
    public readonly force: boolean = false,
  ) {
    this.ocorrido_em = new Date();
  }

  /**
   * Retorna o ID da campanha.
   */
  get campanha_id(): string {
    return this.campanha.id;
  }

  /**
   * Retorna a mensagem da campanha (truncada para logs).
   */
  get mensagem_resumida(): string {
    return this.campanha.mensagem.length > 50
      ? `${this.campanha.mensagem.substring(0, 50)}...`
      : this.campanha.mensagem;
  }

  /**
   * Converte o evento para um objeto JSON (útil para logging).
   */
  toJSON() {
    return {
      nome: this.nome,
      ocorrido_em: this.ocorrido_em.toISOString(),
      campanha_id: this.campanha_id,
      quantidade_contatos: this.quantidade_contatos,
      force: this.force,
      mensagem_resumida: this.mensagem_resumida,
    };
  }
}
