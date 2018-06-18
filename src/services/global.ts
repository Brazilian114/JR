import 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class Global {
  public hostWebService:string = 'http://192.168.1.230/RF-Service-ekapab/RFService.asmx';
  public globalSelectedItems=[];
  constructor(){

  }
}
