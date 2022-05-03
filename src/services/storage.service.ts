import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public load(base : string) : any {
    var value = window.localStorage.getItem(base);
    if(value)
      return JSON.parse(value);
    return null;
  }
  public save(base : string, value : any) : any {
    var strValue = JSON.stringify(value);
    window.localStorage.setItem(base, strValue);
  }

  public backup() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(window.localStorage));
    var date = new Date();
    var dateStr = date.toLocaleDateString("pt-br").split("/").reverse().join("-")+"_"+ date.toLocaleTimeString("pt-BR")
    var virtualElement = document.createElement('a' );
    virtualElement.setAttribute("href",     dataStr     );
    virtualElement.setAttribute("download", "financeiro-"+dateStr+".json");
    document.body.appendChild(virtualElement);
    virtualElement.click();
    virtualElement.remove();
  }

  public restore(baseStr: string) {
    var base = JSON.parse(baseStr);
    window.localStorage.clear();
    for (const key in base) {
      if (Object.prototype.hasOwnProperty.call(base, key)) {
        const element = base[key];
        window.localStorage.setItem(key, element);
      }
    }
    window.location.reload();

  }

}
