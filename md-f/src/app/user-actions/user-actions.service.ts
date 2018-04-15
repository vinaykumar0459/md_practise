import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserActionsService {
  ip_url: string = 'http://freegeoip.net/json/';
  user_action_url: string;
  data : any={'success':'',error:''};
  constructor(private _http: Http) { }
  getip() {
    var  headers = new Headers;
    headers.append('Content-Type','application/json; charset=utf-8');
      return this._http.get(this.ip_url,{headers:headers}).map(res=>res);
  }
  get_method() {
    var  headers = new Headers;
    headers.append('Content-Type','application/json; charset=utf-8');
      return this._http.get(this.user_action_url,{headers:headers}).map(res=>res);
  }
  post_method() {
    var  headers = new Headers;
    headers.append('Content-Type','application/json; charset=utf-8');
      return this._http.post(this.user_action_url,this.data,{headers:headers}).map(res=>res);
  }
}