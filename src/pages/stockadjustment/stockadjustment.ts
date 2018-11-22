import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';

@IonicPage(
  {name:'StockadjustmentPage',
  segment: 'Stockadjustment'}
)

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
    let profileModal = this.modalCtrl.create("ItemNomodalPage", { oClient: oClient });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        this.oItem = data.itemNo;
        this.oDes = data.description;
      });
  }
}
