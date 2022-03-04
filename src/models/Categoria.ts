import { Icons } from './../app/global-components/Icons.enum';

export class Categoria {
  nome : String = "";
  icon : Icons = Icons.QUESTION_MARK_OUTLINE;
  // isChecked : boolean = false;
  isEntrada : boolean = false;

  constructor(nome?: String, icon? : Icons, isEntrada?: boolean) {
    if(nome) this.nome = nome;
    if(icon) this.icon = icon;
    if(isEntrada) this.isEntrada = isEntrada;
  }
}
