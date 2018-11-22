import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Service } from '../../../services/service';

@IonicPage(
  {name:'SuppliermodelPage',
  segment: 'Suppliermodel'}
)
@Component({
  selector: 'page-suppliermodel',
  templateUrl: 'suppliermodel.html'
})
export class SuppliermodelPage {
  data_supplier:any;
  oClient:any;
  loader:any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {

      this.oClient = navParams.get('oClient');
      console.log(this.oClient);
      this.doGetSupplier(this.oClient);

  }
  initializeItems() {

      this.items = this.data_supplier;

  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
        let val = ev.target.value;
        if(val && val.trim() != ''){
          this.items = this.items.filter((item)=>{
            return (item.supplier_name["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  }


  doSelectSupplier(supplier, supplier_name){
    let data = { 'supplier': supplier, 'supplier_name': supplier_name };
    this.viewCtrl.dismiss(data);
  }

  doGetSupplier(oClient){
    this.presentLoading();
    this.service.get_Supplier(oClient).then((res)=>{
      this.data_supplier = res;
      console.log(this.data_supplier);
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
