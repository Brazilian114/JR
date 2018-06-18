import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Service } from '../../services/service';

@Component({
  selector: 'page-putawaydetail',
  templateUrl: 'putawaydetail.html'
})
export class PutawaydetailPage {
    oRecipt:any;
    data_detail:any;
    oUsername:any;
  constructor(public navCtrl: NavController, private navParams: NavParams,
              private service: Service) {

    this.oRecipt = this.navParams.get('oRecipt');
    this.oUsername = this.navParams.get('oUsername');
    console.log(this.oRecipt);
    this.doGetPutawayDetail(this.oRecipt, this.oUsername);
  }
  doGetPutawayDetail(oRecipt, oUsername){
    console.log(oRecipt);
    this.service.get_putaway_detail(oRecipt, "", oUsername).then((res)=>{
      this.data_detail = res;
      // console.log(this.data_detail);
    });
  }
}
