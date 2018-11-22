import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, IonicPage } from 'ionic-angular';

import { Service } from '../../../services/service';

@IonicPage(
  {name:'LicensePage',
  segment: 'License'}
)
@Component({
  selector: 'page-license',
  templateUrl: 'license.html'
})
export class LicensePage {
  data_license:any;
  items: any;
  loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {

      this.doGetTruckLicensePlate();

  }
  initializeItems() {
    this.items = this.data_license;
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
  doSelectTruckLicensePlate(param_desc, remark){
    let data = { 'param_desc': param_desc, 'remark': remark };
    this.viewCtrl.dismiss(data);
  }
  doGetTruckLicensePlate(){
      this.presentLoading();
      this.service.Get_Loading_Summary_Truck_License_Plate().then((res)=>{
        this.data_license = res;
        console.log(this.data_license);
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
