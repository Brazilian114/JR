import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, IonicPage } from 'ionic-angular';

import { Service } from '../../../services/service';

@IonicPage(
  {name:'DriverPage',
  segment: 'Driver'}
)
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html'
})
export class DriverPage {
  data_driver:any;
  items: any;
  loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {

      this.doGetDriver();

  }
  initializeItems() {
    this.items = this.data_driver;
  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
        let val = ev.target.value;
        if(val && val.trim() != ''){
          this.items = this.items.filter((item)=>{
            return (item.param_desc["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  }
  doSelectDriver(param_code, param_desc){
    let data = { 'param_code': param_code, 'param_desc': param_desc };
    this.viewCtrl.dismiss(data);
  }
  doGetDriver(){
      this.presentLoading();
      this.service.Get_Loading_Summary_Truck_Driver().then((res)=>{
        this.data_driver = res;
        console.log(this.data_driver);
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
