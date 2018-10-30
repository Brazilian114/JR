import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { Service } from '../../../services/service';

@Component({
  selector: 'page-itemWObyTask-modal',
  templateUrl: 'itemWObyTask-modal.html'
})
export class itemWObyTaskPage {
  data_item:any;
  loader:any;
  oWO:any;
  frag:any;
  oUsername:any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {

    this.oWO = navParams.get('oWo');
    this.oUsername = navParams.get('oUsername');
    this.frag = navParams.get('frag');

    if(this.oWO != undefined && this.frag != 1){
      this.doGetDetailWorkOrder(this.oWO, this.oUsername);
    }else if(this.oWO != undefined){
      this.doGetDetailWorkOrderBySelect(this.oWO);
    }

  }
  initializeItems() {
    this.items = this.data_item;
  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
        let val = ev.target.value;
        if(val && val.trim() != ''){
          this.items = this.items.filter((item)=>{
            return (item.item_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  }
  doSelectItem(itemNo, description, qty, uom, location_from, order_no, pallet_from, delivery_date, customer, task_no
    , activity, location_to, warehouse_from, warehouse_to, zone_dest, zone_from,QTY_Dec){
    let data = { 'itemNo': itemNo, 'description': description, 'qty': qty, 'uom': uom, 'location_from': location_from
    , 'order_no': order_no, 'pallet_from': pallet_from, 'delivery_date': delivery_date, 'customer_name': customer
    , 'task_no': task_no, 'activity': activity, 'location_to': location_to, 'warehouse_from': warehouse_from
    , 'warehouse_to': warehouse_to, 'zone_dest': zone_dest, 'zone_from': zone_from,'QTY_Dec':QTY_Dec };
    this.viewCtrl.dismiss(data);
  }
  doGetDetailWorkOrderBySelect(oWO){
    console.log(this.oUsername);
    this.presentLoading();
    this.service.get_Detail_Tranfer_WorkOrderBySelect(oWO, "", "").then((res)=>{
      this.data_item = res;
      console.log(this.data_item);
      this.finishLoding();
      this.initializeItems();
    })
  }
  doGetDetailWorkOrder(oWO, oUsername){
    console.log(this.oUsername);
    this.presentLoading();
    this.service.get_detail_workorder_by_select(oWO, "", "", oUsername).then((res)=>{
      this.data_item = res;
      console.log(this.data_item);
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
