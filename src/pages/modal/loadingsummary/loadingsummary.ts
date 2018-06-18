import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { Service } from '../../../services/service';

@Component({
  selector: 'page-loadingsummary',
  templateUrl: 'loadingsummary.html'
})
export class LoadingsummaryPage {
  data_loading:any;
  oClient:any;
  items: any;
  loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {

      this.doGetLoading();

  }
  initializeItems() {
    this.items = this.data_loading;
  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
        let val = ev.target.value;
        if(val && val.trim() != ''){
          this.items = this.items.filter((item)=>{
            return (item.load_summary["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  }
  doSelectLoading(load_summary, status, create_date, vehicle_type, vehicle, driver){
    let data = { 'load_summary': load_summary, 'status': status, 'create_date': create_date, 'vehicle_type': vehicle_type, 'vehicle': vehicle, 'driver': driver };
    this.viewCtrl.dismiss(data);
  }
  doGetLoading(){
      this.presentLoading();
      this.service.Get_Loading_Summary_List().then((res)=>{
        this.data_loading = res;
        console.log(this.data_loading);
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
