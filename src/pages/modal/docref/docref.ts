import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, IonicPage } from 'ionic-angular';

import { Service } from '../../../services/service';

@IonicPage(
  {name:'DocrefPage',
  segment: 'Docref'}
)
@Component({
  selector: 'page-docref',
  templateUrl: 'docref.html'
})
export class DocrefPage {
  data_docref:any;
  oClient:any;
  oCustomer:any;
  loader:any;
  items: any;
  oDocref: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {
    this.oClient = navParams.get('oClient');
    this.oCustomer = navParams.get('oCustomer_Header');
    this.oDocref = navParams.get('oDocref');
    if(this.oCustomer == undefined){
      this.oCustomer = "";
    }if(this.oDocref == undefined){
      this.oDocref = "";

      //this.rf_get_sale_for_receipt_return(this.oClient, this.oCustomer,this.oDocref);
    }else{
      this.rf_get_sale_for_receipt_return(this.oClient, this.oCustomer,this.oDocref);
    }

  }
  initializeItems() {
    this.items = this.data_docref;
  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
        let val = ev.target.value;
        if(val && val.trim() != ''){
          this.items = this.items.filter((item)=>{
            return (item.doc_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  }
  doSelectDocref(doc_no, branch){
    let data = { 'doc_no': doc_no, 'branch': branch };
    this.viewCtrl.dismiss(data);
  }
  rf_get_sale_for_receipt_return(oClient, oCustomer,oDocref){
      this.presentLoading();
        console.log("LOG",oClient, oCustomer,oDocref);
      this.service.rf_get_sale_for_receipt_return(oClient, oCustomer,oDocref).then((res)=>{
        this.data_docref = res;
        console.log(this.data_docref);
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
