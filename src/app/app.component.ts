import { Component } from '@angular/core';
import { Icons } from './global-components/Icons.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  title = 'financeiro';
  tituloLista = "Lista de componentes";
  showMenu = false;

  icons: typeof Icons = Icons;

  onSubmit() {
    console.log("Evento chamado pelo pai");
  }
}
