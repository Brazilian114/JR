import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { Service } from '../../../services/service';

@Component({
  selector: 'page-warehousemodal',
  templateUrl: 'warehousemodal.html'
})
export class WarehousemodalPage {
  data_wh:any;
  loader:any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {
    this.doGetWH();
  }
  initializeItems() {
    this.items = this.data_wh;
  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
        let val = ev.target.value;
        if(val && val.trim() != ''){
          this.items = this.items.filter((item)=>{
            return (item.warehouse["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  }
  doSelectWH(warehouse, description){
    let data = { 'warehouse': warehouse, 'description': description };
    this.viewCtrl.dismiss(data);
  }
  doGetWH(){
    this.presentLoading();
    this.service.get_warehouse_loc().then((res)=>{
      this.data_wh = res;
      console.log(this.data_wh);
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
