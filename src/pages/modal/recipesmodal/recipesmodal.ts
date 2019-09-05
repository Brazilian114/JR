import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, IonicPage } from 'ionic-angular';

import { Service } from '../../../services/service';

@IonicPage(
  {name:'RecipesmodalPage',
  segment: 'Recipesmodal'}
)
@Component({
  selector: 'page-recipesmodal',
  templateUrl: 'recipesmodal.html'
})
export class RecipesmodalPage {
  data_receipt:any;
  oClient:any;
  listType:any;
  oReciptNo:any;
  oBook:any;
  loader:any;
  items: any;
  oReceiptType:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {
    this.oClient = navParams.get('oClient');
    this.oReceiptType = navParams.get('oReceiptType');
    this.oReciptNo = navParams.get('oReciptNo');
    this.oBook = navParams.get('oBook');

    console.log(this.oReceiptType);
    console.log(this.oReciptNo);
    this.doGetReceipt(this.oClient, this.oReciptNo, this.oReceiptType, this.oBook);

  }
  initializeItems() {
    this.items = this.data_receipt;
  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
        let val = ev.target.value;
        if(val && val.trim() != ''){
          this.items = this.items.filter((item)=>{
            return (item.receipt_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  }
  doSelectReceipt(receipt_no, receipt_ref_no, supplier, status, date, warehouse, zone, receipt_station, incoming_no, container, customer, remark01, invoice_no, invoice_date, asn_flag, client_po_no){
    let data = { 'receipt_no': receipt_no, 'receipt_ref_no': receipt_ref_no, 'supplier': supplier, 'status': status, 'date': date, 'warehouse': warehouse
    , 'zone': zone, 'receipt_station': receipt_station, 'incoming_no': incoming_no, 'container': container, 'customer': customer, 'remark01': remark01
    , 'invoice_no': invoice_no, 'invoice_date': invoice_date ,'asn_flag': asn_flag , 'client_po_no': client_po_no};
    this.viewCtrl.dismiss(data);
    console.log("doSelectReceipt : recipsemodel",data);
  }
  doGetReceipt(oClient, oReciptNo, oReceiptType, oBook){
    if(oReciptNo == undefined){
      this.presentLoading();
      oReciptNo = "";
     // console.log(this.oReciptNo);
      this.service.get_receipt_detail(oClient, oReciptNo, oReceiptType, oBook).then((res)=>{
        this.data_receipt = res;
        console.log("doGetReceiptttt",this.data_receipt);
        this.initializeItems();
      })
    }else{
      this.presentLoading();
      this.service.get_receipt_detail(oClient, oReciptNo, oReceiptType, oBook).then((res)=>{
        this.data_receipt = res;
          console.log(this.data_receipt);
        if(this.data_receipt.length == 1){
          console.log(this.data_receipt);
        }
        // console.log("test1",this.data_receipt);
        this.initializeItems();
      })
    }
    this.finishLoding();
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
