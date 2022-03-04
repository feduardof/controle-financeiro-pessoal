import { Icons } from './../app/global-components/Icons.enum';
import { Categoria } from './../models/Categoria';
import { Injectable } from '@angular/core';


type Categorias = {
  [key: string] : Categoria
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor() { }

  CATEGORIAS :  Categorias = {
    SUPERMERCADO : new Categoria("Supermercado", Icons.SHOPPING_CART_OUTLINE),
    SAUDE : new Categoria("Saúde", Icons.LOCAL_HOSPITAL),
    CARTAO_CREDITO: new Categoria("Cartão de crédito", Icons.CREDIT_CARD),
    CASA: new Categoria("Casa", Icons.HOME),
    DIVERSAO: new Categoria("Diversão", Icons.BEACH_ACCESS),
    CARRO: new Categoria("Carro", Icons.DIRECTIONS_CAR),
    INTERNET: new Categoria("Internet", Icons.MOBILE_FRIENDLY),
    IMPOSTO: new Categoria("Imposto", Icons.GLOBE_2_OUTLINE),
    ENERGIA: new Categoria("Energia", Icons.POWER),
    ENTRADA: new Categoria("Entrada", Icons.ATTACH_MONEY, true),
  };

  load(name : String) : Categoria {
    for (const key in this.CATEGORIAS) {
      if (Object.prototype.hasOwnProperty.call(this.CATEGORIAS, key)) {
        const e = this.CATEGORIAS[key];
        if(name == e.nome) return e;
      }
    }
    return new Categoria();
  }


}
