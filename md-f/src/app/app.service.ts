import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  constructor(private _http: Http) { }
  getip() {
    return this._http.get("http://freegeoip.net/json/")
        .map(data => {
            data.json().ip;
            console.log(data.json().ip);
    }); 
  }

}