import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { Service } from '../../../services/service';

@Component({
  selector: 'page-putawaymodal',
  templateUrl: 'putawaymodal.html'
})
export class PutawaymodalPage {
  data_pallet_putaway:any;
  oPalletNo:any;
  loader:any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {

    this.oPalletNo = navParams.get('oPallet');
    console.log(this.oPalletNo);
    this.doGetPalletforPutaway(this.oPalletNo);
  }
  initializeItems() {
    this.items = this.data_pallet_putaway;
  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
        let val = ev.target.value;
        if(val && val.trim() != ''){
          this.items = this.items.filter((item)=>{
            return (item.pallet_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  }
  doSelectItem(oPalletNo, oLocation){
    let data = { 'oPalletNo': oPalletNo, 'oLocation': oLocation };
    this.viewCtrl.dismiss(data);
  }
  doGetPalletforPutaway(oPalletNo){
    if(oPalletNo == undefined){
      oPalletNo = "";
      this.service.get_pallet_for_putaway(oPalletNo).then((res)=>{
        this.data_pallet_putaway = res;
        console.log("doGetPalletforPutaway if 1",this.data_pallet_putaway);
        this.initializeItems();
      })
    }else{
      // this.service.get_pallet_for_putaway(oPalletNo+"0").then((res)=>{
      //   this.data_pallet_putaway = res;
      //   console.log(this.data_pallet_putaway);
      oPalletNo = "";
      this.service.get_pallet_for_putaway(oPalletNo).then((res)=>{
        this.data_pallet_putaway = res;
        console.log("doGetPalletforPutaway if 2",this.data_pallet_putaway);
      // })
        if(this.data_pallet_putaway["0"].Column1 == "E"){
          oPalletNo = "";
          this.service.get_pallet_for_putaway(oPalletNo).then((res)=>{
            this.data_pallet_putaway = res;
            console.log(this.data_pallet_putaway);
            this.initializeItems();
          })
        }else{

        }
      })
    }

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
