// src/domain/value-objects/telefone.vo.ts

/**
 * Value Object para telefone.
 * Garante que o número esteja sempre no formato esperado (apenas dígitos, 10 a 15 caracteres).
 *
 * @example
 * const telefone = Telefone.criar('(11) 99999-9999');
 * console.log(telefone.valor); // "11999999999"
 * console.log(telefone.formatoWhatsApp()); // "11999999999@c.us"
 */
export class Telefone {
  private readonly _valor: string;
  private static readonly REGEX = /^\d{10,15}$/;

  private constructor(valor: string) {
    this._valor = valor;
  }

  /** Retorna o telefone apenas com dígitos */
  get valor(): string {
    return this._valor;
  }

  /**
   * Cria uma instância de Telefone a partir de uma string.
   * Remove qualquer caractere não numérico antes de validar.
   *
   * @throws {Error} Se o telefone for inválido
   */
  static criar(valor: string): Telefone {
    const apenasDigitos = valor.replace(/\D/g, "");
    if (!Telefone.isValid(apenasDigitos)) {
      throw new Error(
        `Telefone inválido: "${valor}". Deve conter apenas dígitos (10 a 15 caracteres).`,
      );
    }
    return new Telefone(apenasDigitos);
  }

  /**
   * Verifica se o telefone tem formato válido (apenas dígitos, 10-15 caracteres).
   */
  static isValid(valor: string): boolean {
    return this.REGEX.test(valor.replace(/\D/g, ""));
  }

  /**
   * Formata o telefone no padrão exigido pelo WhatsApp: `numero@c.us`
   */
  formatoWhatsApp(): string {
    return `${this._valor}@c.us`;
  }

  /**
   * Verifica se dois telefones são iguais.
   */
  equals(outro: Telefone): boolean {
    return this._valor === outro._valor;
  }

  /**
   * Retorna o telefone como string (apenas dígitos).
   */
  toString(): string {
    return this._valor;
  }
}
