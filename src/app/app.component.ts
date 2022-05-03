import { StorageService } from './../services/storage.service';
import { Component, EventEmitter } from '@angular/core';
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

  constructor(private storageService: StorageService) { }

  onSubmit() {
    console.log("Evento chamado pelo pai");
  }

  backup() {
    this.storageService.backup();
  }

  restore(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      var reader = new FileReader();
      var nameFile = target.files[0].name;
      reader.readAsText(target.files[0], "UTF-8");
      reader.onload = (evt : any ) => {
        if (confirm("Deseja importar o arquivo " + nameFile + "?")) {
          this.storageService.restore(evt.target.result);
        }
      }
      reader.onerror = (evt) => {
        alert("Erro ao importar arquivo");
      }


    }

  }
}
