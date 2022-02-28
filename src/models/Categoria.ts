import { Icons } from './../app/global-components/Icons.enum';

export class Categoria {
  nome : String = "";
  icon : Icons = Icons.QUESTION_MARK_OUTLINE;
  isChecked : boolean = false;

  constructor(nome?: String, icon? : Icons) {
    if(nome) this.nome = nome;
    if(icon) this.icon = icon;
  }
}
