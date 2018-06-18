import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { Service } from '../../../services/service';

@Component({
  selector: 'page-pomodal',
  templateUrl: 'pomodal.html'
})
export class PomodalPage {
  data_po:any;
  oClient:any;
  oReceiptType:any;
  oPo:any;
  oSupplier:any;
  oInc_no:any;
  oItem:any;
  loader:any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {

    this.oClient = navParams.get('oClient');
    this.oSupplier = navParams.get('oSupplier');
    this.oInc_no = navParams.get('oInc_no');



    this.doGetPo(this.oClient, this.oPo, this.oItem);
  }
  initializeItems() {
    this.items = this.data_po;
  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
        let val = ev.target.value;
        if(val && val.trim() != ''){
          this.items = this.items.filter((item)=>{
            return (item.po_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  }
  doSelectPo(order_no, supplier){
    let data = { 'order_no': order_no, 'supplier': supplier };
    this.viewCtrl.dismiss(data);
  }
  doGetPo(oClient, oPo, oItem){
      console.log(oClient, oPo, oItem);
    if(oPo == undefined || oItem == undefined){
      oPo = "";
      oItem = "";
      this.presentLoading();
      this.service.get_PO(oClient,  oPo, oItem).then((res)=>{

        this.data_po = res;
        console.log("test",this.data_po);
        this.finishLoding();
        this.initializeItems();
      })
    }

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
