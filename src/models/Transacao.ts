import { CurrencyPipe } from '@angular/common';
import { CategoriaService } from 'src/services/categoria.service';
import { Categoria } from './Categoria';

export class Transacao {
  id : String = "";
  descricao: string = "";
  valorNumerico: number = 0.0;
  data: Date = new Date();
  isEntrada: boolean = false;
  // tipo: TiposTransacao = TiposTransacao.CORRENTE;
  categoria: Categoria = new Categoria();
  isPago: boolean = false;

  constructor(private currencyPipe : CurrencyPipe){ }

  get valor() : number {
    return this.valorNumerico;
  }

  set valor(valor: number) {
    let nb: any = valor.toString().match(/\d+/g)?.join("");
    nb = !isNaN(nb)  ? (parseFloat(nb) / 100 ).toFixed(2) : 0;
    this.valorNumerico = parseFloat(nb);
  }


  get valorFormatado() : string | null {
    return this.currencyPipe.transform(this.valorNumerico);
  }

  set valorFormatado(valor: string | null) {
    let nb: any = valor?.match(/\d+/g)?.join("");
    nb = !isNaN(nb)  ? (parseFloat(nb) / 100 ).toFixed(2) : 0;
    this.valorNumerico = parseFloat(nb);
  }

  beforeSave() {
    this.loadCateoria(this);
  }

  loadCateoria(obj : any) {
    if (typeof obj.categoria == "string") this.categoria = new CategoriaService().load(obj.categoria);
    else this.categoria = new CategoriaService().load(obj.categoria.nome);
  }

  fromObject(obj: any) : Transacao {
    this.descricao = obj.descricao;
    this.valorNumerico = obj.valorNumerico;
    this.data = new Date(obj.data);
    this.isEntrada = obj.isEntrada;
    // this.tipo = obj.tipo;
    this.id = obj.id;
    this.isPago = obj.isPago;
    this.loadCateoria(obj);
    return this;
  }

  static fromArray(currencyPipe : CurrencyPipe, list : Array<any>) : Array<Transacao> {
    var retorno : Array<Transacao> = [];
    list.forEach(e => {
      var t = new Transacao(currencyPipe);
      retorno.push(t.fromObject(e));
    })

    return retorno;

  }


}


export enum TiposTransacao {
  MENSAL = "Mensal",
  CORRENTE = "Corrente",
}


