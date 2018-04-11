import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  url: string = 'http://freegeoip.net/json/';
  constructor(private _http: Http) { }
  getip() {
    var  headers = new Headers;
    headers.append('Content-Type','application/json; charset=utf-8');
return this._http.get(this.url,{headers:headers}).map(res=>res);
    // return this._http.get("http://freegeoip.net/json/")
    //     .map(data => {
    //         data.json().ip;
    //         console.log(data.json().ip);
    // }); 
  }

}