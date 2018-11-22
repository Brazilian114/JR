import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, IonicPage } from 'ionic-angular';

import { Service } from '../../../services/service';

@IonicPage(
  {name:'ItemNomodalPage',
  segment: 'ItemNomodal'}
)
@Component({
  selector: 'page-itemNo-modal',
  templateUrl: 'itemNo-modal.html'
})
export class ItemNomodalPage {
  data_item:any;
  oClient:any;
  oReceipt:any;
  oDocRef:any;
  oItemNo:any;
  oPo:any;
  loader:any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {

    this.oClient = navParams.get('oClient');
    this.oReceipt = navParams.get('oReceipt');
    this.oDocRef = navParams.get('oDocRef');
    this.oItemNo = navParams.get('oItemNo');
    this.oPo = navParams.get('oPo');

    if(this.oItemNo != undefined){
      this.doGetItemCodeRefASN(this.oClient, this.oReceipt, this.oDocRef, this.oItemNo);
      console.log("1",this.oClient);
    }else if(this.oPo != undefined){
      this.oReceipt = "";
      this.doGetItemCodeRefPO(this.oClient, this.oReceipt, this.oPo);
      console.log("2",this.oClient);
    }else{
      // if(this.oPo == undefined  && this.oReceipt == undefined && this.oItemNo == undefined){
        this.oPo = "";
        this.oReceipt = "";
        this.oItemNo = "";
        this.doGetItem(this.oClient,this.oReceipt,this.oPo,this.oItemNo);
      // }

    }

  }
  initializeItems() {
    this.items = this.data_item;
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
  doSelectItem(itemNo, description,qty,default_grade){
    let data = { 'itemNo': itemNo, 'description': description ,'qty': qty,'default_grade':default_grade};
    this.viewCtrl.dismiss(data);
  }
  doGetItem(oClient,oReceiptNO,oPONo,oItemNO){
    this.presentLoading();
    this.service.get_showitemlist(oClient,oReceiptNO,oPONo,oItemNO).then((res)=>{
      this.data_item = res;
      console.log(this.data_item);
      this.finishLoding();
      this.initializeItems();
    })
  }
  doGetItemCodeRefASN(oClient, oReceipt, oDocRef, oItemNo){
    this.presentLoading();
    this.service.get_item_code_ref_ASN(oClient, oReceipt, oDocRef, oItemNo).then((res)=>{
      this.data_item = res;
      console.log(this.data_item);
      this.finishLoding();
      this.initializeItems();
    })
  }
  doGetItemCodeRefPO(oClient, oReceipt, oPo){
    this.presentLoading();
    this.service.get_item_code_ref_PO(oClient, oReceipt, oPo).then((res)=>{
      this.data_item = res;
      console.log(this.data_item);
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
     this.viewCtrl.dismiss();

   }
}
