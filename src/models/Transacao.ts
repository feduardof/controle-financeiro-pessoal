import { CurrencyPipe } from '@angular/common';

export class Transacao {
  descricao: string = "";
  private _valor: number = 0.0;
  data: Date = new Date();

  constructor(private currencyPipe : CurrencyPipe){}

  get valor() : number {
    return this._valor;
  }

  set valor(valor: number) {
    let nb: any = valor.toString().match(/\d+/g)?.join("");
    nb = !isNaN(nb)  ? (parseFloat(nb) / 100 ).toFixed(2) : 0;
    this._valor = parseFloat(nb);
  }


  get valorFormatado() : string | null {
    return this.currencyPipe.transform(this._valor);
  }

  set valorFormatado(valor: string | null) {
    let nb: any = valor?.match(/\d+/g)?.join("");
    nb = !isNaN(nb)  ? (parseFloat(nb) / 100 ).toFixed(2) : 0;
    this._valor = parseFloat(nb);
  }


}
