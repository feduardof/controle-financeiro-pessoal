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

}
