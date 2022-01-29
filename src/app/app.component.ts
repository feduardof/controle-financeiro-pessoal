import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'financeiro';
  tituloLista = "Lista de componentes";

  onSubmit() {
    console.log("Evento chamado pelo pai");
  }
}
