import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Service } from '../../../services/service';

@Component({
  selector: 'page-suppliermodel',
  templateUrl: 'suppliermodel.html'
})
export class SuppliermodelPage {
  data_supplier:any;
  data_line:any;
  oUsername:any;
  oClient:any;
  loader:any;
  oOrderNo:any;
  oWorksOrder:any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController , private storage: Storage) {
       this.storage.get('_user').then((res)=>{
         this.oUsername = res;
         console.log(this.oUsername);

       })
       this.oClient = navParams.get('oClient');
       this.oOrderNo = navParams.get('oOrderNo');
       this.oWorksOrder = navParams.get('oWorksOrder');
       console.log( this.oOrderNo,  this.oWorksOrder);
       if(this.oOrderNo != undefined || this.oOrderNo != ""){
          this.doGetLine( this.oClient, this.oOrderNo, this.oWorksOrder);
       }else{
          this.doGetSupplier(this.oClient);
       }

  }
  initializeItems() {
    if(this.data_line != undefined){
      this.items = this.data_line;
    }else{
      this.items = this.data_supplier;
    }
  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
          if(this.data_line != undefined){
            let val = ev.target.value;
            if(val && val.trim() != ''){
              this.items = this.items.filter((item)=>{
                return (item.item_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
              })
            }
          }else{
            let val = ev.target.value;
            if(val && val.trim() != ''){
              this.items = this.items.filter((item)=>{
                return (item.supplier_name["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
              })
            }
          }
  }
  doSelectSupplier(supplier, supplier_name){
    let data = { 'supplier': supplier, 'supplier_name': supplier_name };
    this.viewCtrl.dismiss(data);
  }
  doSelectLine(line_no, item_no, description, qty, grade, whse_source, zone, uom, qty_picked){
    let data = { 'line_no': line_no, 'item_no': item_no, 'description': description, 'qty': qty, 'grade': grade, 'whse_source': whse_source, 'zone': zone, 'uom': uom, 'qty_picked': qty_picked };
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
  doGetLine(oClient, oOrderNo, oWorksOrder){
    this.service.get_WO_Pick_by_Order_Detail(oClient, oOrderNo, oWorksOrder).then((res)=>{
      this.data_line = res;
      console.log(this.data_line);
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
