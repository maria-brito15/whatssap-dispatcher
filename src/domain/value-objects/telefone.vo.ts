// src/domain/value-objects/telefone.vo.ts

export class Telefone {
  private readonly _valor: string;
  private static readonly REGEX = /^\d{10,15}$/;

  private constructor(valor: string) {
    this._valor = valor;
  }

  get valor(): string {
    return this._valor;
  }

  static criar(valor: string): Telefone {
    const apenasDigitos = valor.replace(/\D/g, "");

    if (!Telefone.eh_valido(apenasDigitos)) {
      throw new Error(
        `Telefone inválido: "${valor}". Deve conter apenas dígitos (10 a 15 caracteres).`,
      );
    }

    return new Telefone(apenasDigitos);
  }

  static eh_valido(valor: string): boolean {
    return this.REGEX.test(valor.replace(/\D/g, ""));
  }

  formatar_para_whatsApp(): string {
    return `${this._valor}@c.us`;
  }

  equals(outro: Telefone): boolean {
    return this._valor === outro._valor;
  }

  toString(): string {
    return this._valor;
  }
}
