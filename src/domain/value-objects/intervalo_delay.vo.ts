// src/domain/value-objects/intervalo_delay.vo.ts

/**
 * Value Object que representa um intervalo de delay (em segundos).
 * Garante que o valor mínimo seja menor ou igual ao máximo.
 *
 * @example
 * const intervalo = DelayRange.criar(2, 5);
 * console.log(intervalo.delayAleatorio()); // 3 (aleatório entre 2 e 5)
 * console.log(intervalo.calcularAgendamento(new Date())); // Date com +3s
 */
export class DelayRange {
  private readonly _min: number;
  private readonly _max: number;

  private constructor(min: number, max: number) {
    this._min = min;
    this._max = max;
  }

  /** Delay mínimo (em segundos) */
  get min(): number {
    return this._min;
  }

  /** Delay máximo (em segundos) */
  get max(): number {
    return this._max;
  }

  /**
   * Cria uma instância validando que min <= max e ambos >= 0.
   *
   * @throws {Error} Se os valores forem inválidos
   */
  static criar(min: number, max: number): DelayRange {
    if (min < 0 || max < 0) {
      throw new Error("Os delays não podem ser negativos.");
    }
    if (min > max) {
      throw new Error(
        `O delay mínimo (${min}) não pode ser maior que o máximo (${max}).`,
      );
    }
    return new DelayRange(min, max);
  }

  /**
   * Gera um delay aleatório dentro do intervalo (inclusive).
   */
  delayAleatorio(): number {
    return Math.floor(Math.random() * (this._max - this._min + 1)) + this._min;
  }

  /**
   * Calcula a data/hora agendada (agora + delay aleatório).
   * @param agora Data/hora de referência (normalmente `new Date()`)
   * @returns Data/hora no futuro
   */
  calcularAgendamento(agora: Date): Date {
    const delaySegundos = this.delayAleatorio();
    return new Date(agora.getTime() + delaySegundos * 1000);
  }

  /**
   * Verifica se dois intervalos são iguais.
   */
  equals(outro: DelayRange): boolean {
    return this._min === outro._min && this._max === outro._max;
  }

  /**
   * Retorna o intervalo como string "min-max".
   */
  toString(): string {
    return `${this._min}-${this._max}`;
  }
}
