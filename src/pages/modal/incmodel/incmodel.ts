import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Service } from '../../../services/service';

@IonicPage(
  {name:'IncmodelPage',
  segment: 'Incmodel'}
)
@Component({
  selector: 'page-incmodel',
  templateUrl: 'incmodel.html'
})
export class IncmodelPage {
  data_inc:any;
  oUsername:any;
  oClient:any;
  oSupplier:any;
  oDate:any;
  loader:any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController , private storage: Storage) {
       this.storage.get('_user').then((res)=>{
         this.oUsername = res;
         console.log(this.oUsername);

       })
       this.oClient = navParams.get('oClient');
       this.oSupplier = navParams.get('oSupplier');
       this.oDate = navParams.get('oDate');

       console.log(this.oClient);
       console.log(this.oSupplier);
       console.log(this.oDate);
       if(this.oSupplier == undefined){
         this.oSupplier = "";
         this.doGetInc(this.oClient, this.oSupplier, this.oDate);
       }else{
        this.doGetInc(this.oClient, this.oSupplier, this.oDate);
       }
  }
  initializeItems() {
    this.items = this.data_inc;
  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
        let val = ev.target.value;
        if(val && val.trim() != ''){
          this.items = this.items.filter((item)=>{
            return (item.inc_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  }
  doSelectInc(inc_no, supplier, supplier_name){
    let data = { 'inc_no': inc_no, 'supplier_id': supplier, 'supplier_name': supplier_name };
    this.viewCtrl.dismiss(data);
  }
  doGetInc(oClient, oSupplier, oDate){
    this.presentLoading();
    this.service.get_Incoming_Header(oClient, oSupplier, oDate).then((res)=>{
      this.data_inc = res;
      console.log(this.data_inc);
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
