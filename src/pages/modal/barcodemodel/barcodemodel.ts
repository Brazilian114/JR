import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, IonicPage } from 'ionic-angular';

import { Service } from '../../../services/service';

@IonicPage(
  {name:'BarcodemodelPage',
  segment: 'Barcodemodel'}
)

@Component({
  selector: 'page-barcodemodel',
  templateUrl: 'barcodemodel.html'
})
export class BarcodemodelPage {
  data_barcode:any;
  oUsername:any;
  loader:any;
  oClient:any;
  oBarcode:any;
  oUOM:any;
  oItemNo:any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {

       this.oClient = navParams.get('oClient');
       this.oBarcode = navParams.get('oBarcode');
       this.oItemNo = navParams.get('oItemNo');
       this.oUOM = navParams.get('oUOM');

       this.doGetBarcode(this.oClient, this.oBarcode, this.oItemNo, this.oUOM);
  }
  initializeItems() {
    this.items = this.data_barcode;
  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
        let val = ev.target.value;
        if(val && val.trim() != ''){
          this.items = this.items.filter((item)=>{
            return (item.item_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  }
  doGetBarcode(oClient, oBarcode, oItemNo, oUOM){
    this.presentLoading();
    this.service.show_StockList_Item(oClient, oBarcode, oItemNo, oUOM).then((res)=>{
      this.data_barcode = res;
      console.log(this.data_barcode);
      this.finishLoding();
      this.initializeItems();
    })
  }
  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content:"Loading..."
    });
    // this.loader.present();
    this.loader.present().then(() => {});
  };
  finishLoding(){
    this.loader.dismiss();
  }
  dismiss() {
     let data = { 'foo': 'bar' };
     this.viewCtrl.dismiss(data);

   }
}
