// src/domain/value-objects/intervalo_delay.vo.ts

export class IntervaloDelay {
  private readonly _min: number;
  private readonly _max: number;

  private constructor(min: number, max: number) {
    this._min = min;
    this._max = max;
  }

  get min(): number {
    return this._min;
  }

  get max(): number {
    return this._max;
  }

  static criar(min: number, max: number): IntervaloDelay {
    if (min < 0 || max < 0) {
      throw new Error("Os delays não podem ser negativos.");
    }

    if (min > max) {
      throw new Error(
        `O delay mínimo (${min}) não pode ser maior que o máximo (${max}).`,
      );
    }

    return new IntervaloDelay(min, max);
  }

  delay_aleatorio(): number {
    return Math.floor(Math.random() * (this._max - this._min + 1)) + this._min;
  }

  calcular_agendamento(agora: Date): Date {
    const delaySegundos = this.delay_aleatorio();
    return new Date(agora.getTime() + delaySegundos * 1000);
  }

  equals(outro: IntervaloDelay): boolean {
    return this._min === outro._min && this._max === outro._max;
  }

  toString(): string {
    return `${this._min}-${this._max}`;
  }
}
