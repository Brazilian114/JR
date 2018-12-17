import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, IonicPage } from 'ionic-angular';

import { Service } from '../../../services/service';

@IonicPage(
  {name:'itemPickSumPage',
  segment: 'itemPickSum'}
)
@Component({
  selector: 'page-itemPickSum',
  templateUrl: 'itemPickSum.html'
})
export class itemPickSumPage {
  data_item:any;
  loader:any;
  oWO:any;
  oClient:any;
  frag:any;
  oUsername:any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController) {

    this.oWO = navParams.get('oWo');
    this.oClient = navParams.get('oClient');
    this.oUsername = navParams.get('oUsername');
    this.frag = navParams.get('frag');

console.log(this.oWO);
  console.log(this.oClient);


    if(this.oWO != undefined){
      this.doGetDetailWorkOrder(this.oWO, this.oClient, this.oUsername);
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
    , activity, location_to, warehouse_from, warehouse_to, zone_dest, zone_from){
    let data = { 'itemNo': itemNo, 'description': description, 'qty': qty, 'uom': uom, 'location_from': location_from
    , 'order_no': order_no, 'pallet_from': pallet_from, 'delivery_date': delivery_date, 'customer_name': customer
    , 'task_no': task_no, 'activity': activity, 'location_to': location_to, 'warehouse_from': warehouse_from
    , 'warehouse_to': warehouse_to, 'zone_dest': zone_dest, 'zone_from': zone_from };
    this.viewCtrl.dismiss(data);
  }

  doSelectItemSum( item_no,  description,  qty,  uom,  location_from, pallet_from, batch_no,area_to, warehouse_to, location_to, status, wave_pick_no, area_from, qty_uom1, qty_uom2, expiry_date, prod_date,lot_no){
    let data = { 'item_no' : item_no, 'description' : description, 'qty' : qty, 'uom' : uom, 'location_from' : location_from, 'pallet_from' :pallet_from, 'batch_no' : batch_no ,
  'area_to' :area_to,'warehouse_to' : warehouse_to, 'location_to' :location_to, 'status' :status, 'wave_pick_no' :wave_pick_no,'area_from' : area_from,'qty_uom1' : qty_uom1,'qty_uom2' : qty_uom2, 'expiry_date' : expiry_date,'prod_date' : prod_date,'lot_no' : lot_no }
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
  doGetDetailWorkOrder(oWO,oClient, oUsername){
    console.log(this.oUsername);
      console.log(this.oClient);
    this.presentLoading();
    this.service.get_detail_pick_sum(oWO, oClient,  oUsername).then((res)=>{
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
