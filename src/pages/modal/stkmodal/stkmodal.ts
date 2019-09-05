import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, IonicPage } from 'ionic-angular';

import { Service } from '../../../services/service';

@IonicPage(
  {name:'StkmodalPage',
  segment: 'Stkmodal'}
)
@Component({
  selector: 'page-stkmodal',
  templateUrl: 'stkmodal.html'
})
export class StkmodalPage {
  data_stk:any;
  oClient:any;
  loader:any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {
    this.oClient = navParams.get('oClient');
    this.doGetStk(this.oClient);
  }
  initializeItems() {
    this.items = this.data_stk;
  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
        let val = ev.target.value;
        if(val && val.trim() != ''){
          this.items = this.items.filter((item)=>{
            return (item.stocktake_ref["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  }
  doSelectStk(count_type, status, stocktake_ref, warehouse){
    let data = {'count_type': count_type, 'status': status, 'stocktake_ref': stocktake_ref, 'warehouse': warehouse };
    this.viewCtrl.dismiss(data);
  }
  doGetStk(oClient){
      this.presentLoading();
      this.service.get_StockCountRefGet(oClient,"").then((res)=>{
        this.data_stk = res;
        console.log(this.data_stk);
        this.finishLoding();
        this.initializeItems();
      })
  }

  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content:"Loading...",duration:3000
    });
    // this.loader.present();
    this.loader.present().then(() => {});
  };
  finishLoding(){
    this.loader.dismiss();
  }
  dismiss() {
     this.viewCtrl.dismiss();

   }
}
