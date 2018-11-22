import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, IonicPage } from 'ionic-angular';

import { Service } from '../../../services/service';

@IonicPage(
  {name:'SaleorderPage',
  segment: 'Saleorder'}
)
@Component({
  selector: 'page-saleorder',
  templateUrl: 'saleorder.html'
})
export class SaleorderPage {
  data_saleorder:any;
  oClient:string = "";
  loader:any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {

       this.oClient = navParams.get('oClient');

       this.doGetSO(this.oClient);

  }
  initializeItems() {
    this.items = this.data_saleorder;
  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
        let val = ev.target.value;
        if(val && val.trim() != ''){
          this.items = this.items.filter((item)=>{
            return (item.sales_order["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  }
  doSelectSO(sales_order, customer, customer_name, delivery){
    let data = { 'sales_order': sales_order, 'customer': customer, 'customer_name': customer_name ,'delivery':delivery};
      console.log("doSelectSO",data);
    this.viewCtrl.dismiss(data);
  }
  doGetSO(oClient){
      this.presentLoading();
      this.service.Get_Loading_Sales_Order_Customer_Info(oClient).then((res)=>{
        this.data_saleorder = res;
        console.log(this.data_saleorder);
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
