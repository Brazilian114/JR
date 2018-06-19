import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { Service } from '../../../services/service';

@Component({
  selector: 'page-womodal',
  templateUrl: 'womodal.html'
})
export class WomodalPage {
  data_wo:any;
  data_pick_sum:any;
  data_wo_by_order:any;
  oClient:any;
  oWo:any;

  wave_pick_no:any;
  oUsername:any;
  frag:any;
  items: any;
  loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {
    this.oClient = navParams.get('oClient');
    this.oWo = navParams.get('oWo');
    this.oUsername = navParams.get('oUsername');
    this.frag = navParams.get('frag');
    console.log(this.frag);
    console.log(this.oClient);
    if(this.frag != 1 && this.frag != 2 && this.frag != 3){
        this.doGetWo(this.oClient);
    }else if(this.frag == 1){
      if(this.oWo == undefined){
        this.oWo = "";
        this.doGetWoTranferStockMovements(this.oClient, this.oWo, this.oUsername);

      }else{
        this.oWo = "";
        this.doGetWoTranferStockMovements(this.oClient, this.oWo, this.oUsername);
      }
    }else if(this.frag == 3){
      if(this.oWo == undefined){
        this.oWo = "";
        this.doGetWoSum(this.oClient);

      }else{
        this.oWo = "";
        this.doGetWo(this.oClient);
      }
    }
    else{
      this.doGetWOPickbyOrder(this.oClient, this.oUsername);
    }
  }
  initializeItems() {
    if(this.data_wo != undefined){
      this.items = this.data_wo;
    }else if (this.data_pick_sum){
      this.items = this.data_pick_sum;
    }
   else{
      this.items = this.data_wo_by_order;
    }

  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
          if(this.data_wo != undefined){
            let val = ev.target.value;
            if(val && val.trim() != ''){
              this.items = this.items.filter((item)=>{
                return (item.wo_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
              })
            }
          }
            else if(this.data_pick_sum != undefined)
            {
                let val = ev.target.value;
                if(val && val.trim() != ''){
                  this.items = this.items.filter((item)=>{
                    return (item.wave_pick_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
                  })
                }

            }
          else{
            let val = ev.target.value;
            if(val && val.trim() != ''){
              this.items = this.items.filter((item)=>{
                return (item.works_order["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
              })
            }
          }

  }
  doSelectWO(wo_no, deliver_to, so_no, wo_status, delivery_date, customer_name, customer){
    let data = { 'wo_no': wo_no, 'deliver_to': deliver_to, 'so_no': so_no, 'wo_status': wo_status
    , 'delivery_date': delivery_date, 'customer_name': customer_name, 'customer': customer };
    this.viewCtrl.dismiss(data);
  }
  doSelectPickSum(wave_pick_no){
    let data = { 'wave_pick_no': wave_pick_no };
    this.viewCtrl.dismiss(data);
  }
  doSelectWOByOrder(works_order, dlvr_to, dlvr_code, status, delivery_date, customer_name, customer, order_no, reference_no, create_date){
    let data = { 'works_order': works_order, 'dlvr_to': dlvr_to, 'dlvr_code': dlvr_code, 'status': status
    , 'delivery_date': delivery_date, 'customer_name': customer_name, 'customer': customer , 'order_no': order_no, 'reference_no': reference_no, 'create_date': create_date};
    this.viewCtrl.dismiss(data);
  }
 doGetWo(oClient){

   this.presentLoading();
    this.service.get_wo(oClient, "", "").then((res)=>{
      this.data_wo = res;
      console.log(this.data_wo);
      this.finishLoding();
      this.initializeItems();
    })
  }

  doGetWoSum(oClient){
    this.presentLoading();
    this.service.get_wo_sum(oClient, "", "").then((res)=>{
      this.data_pick_sum = res;
      console.log(this.data_pick_sum);
      this.finishLoding();
      this.initializeItems();
    })
  }


  doGetWOPickbyOrder(oClient, oUsername){
    this.presentLoading();
    this.service.get_WO_Pick_by_Order(oClient, oUsername).then((res)=>{
      this.data_wo_by_order = res;
      console.log(this.data_wo_by_order);
      this.finishLoding();
      this.initializeItems();
    })
  }
  doGetWoTranferStockMovements(oClient, oWo, oUsername){
    this.presentLoading();
    this.service.get_TranferStockMovements(oClient, oWo, oUsername).then((res)=>{
      this.data_wo = res;
      console.log(this.data_wo, "1");
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
