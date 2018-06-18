import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemNomodalPage } from '../modal/itemNo-modal/itemNo-modal';


@Component({
  selector: 'page-stockadjustment',
  templateUrl: 'stockadjustment.html'
})
export class StockadjustmentPage {
  oClient:any;
  oDes:any = null;
  oItem:any = null;
  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {
    // this.doGet();
  }

  doGetItemNo(oClient){
    let profileModal = this.modalCtrl.create(ItemNomodalPage, { oClient: oClient });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        this.oItem = data.itemNo;
        this.oDes = data.description;
      });
  }
}
