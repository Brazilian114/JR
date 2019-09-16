import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Service } from '../../../services/service';

@IonicPage(
  {name:'PalletmodelPage',
  segment: 'Palletmodel'}
)
@Component({
  selector: 'page-palletmodel',
  templateUrl: 'palletmodel.html'
})
export class PalletmodelPage {
  data_pallet:any = null;
  data_pallet_for_rep:any = null;
  data_pallet_for_workorder:any = null;
  oUsername:any;
  oClient:any;
  oReceipt:any;
  loader:any;
  oPallet:any;
  oWorksOrder:any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController , private storage: Storage) {
       this.storage.get('_user').then((res)=>{
         this.oUsername = res;
         console.log(this.oUsername);

       })
       this.oClient = navParams.get('oClient');
       this.oReceipt = navParams.get('oReceipt');
       this.oPallet = navParams.get('oPallet');
       this.oWorksOrder = navParams.get('oWorksOrder');
       console.log(this.oClient);
       console.log("reciept",this.oReceipt);
       console.log(this.oPallet);
       console.log(this.oWorksOrder);
       if(this.oPallet != undefined){
         this.doGetPalletReplenishment(this.oClient, this.oPallet);
       }else if(this.oWorksOrder != undefined){
         this.doGetPalletTobyWorks(this.oWorksOrder);
       }else{
         this.doGetPallet(this.oClient, this.oReceipt);
       }
  }
  initializeItems() {
   /* if(this.data_pallet_for_workorder != undefined){
      this.items = this.data_pallet_for_workorder;
    }else if(this.data_pallet_for_rep != undefined){
      this.items = this.data_pallet_for_rep;
    }else{
      this.items = this.data_pallet;
    }*/
    this.items = this.data_pallet;
  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);

          if(this.data_pallet_for_rep != undefined){
            console.log(this.data_pallet_for_rep);
            let val = ev.target.value;
            if(val && val.trim() != ''){
              this.items = this.items.filter((item)=>{
                return (item.item_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
              })
            }
          }else if(this.data_pallet_for_workorder != undefined){
            console.log(this.data_pallet_for_workorder);
            let val = ev.target.value;
            if(val && val.trim() != ''){
              this.items = this.items.filter((item)=>{
                return (item.pallet_to["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
              })
            }
          }else{
            console.log(this.data_pallet);
            let val = ev.target.value;
            if(val && val.trim() != ''){
              this.items = this.items.filter((item)=>{
                return (item.pallet_no["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
              })
            }
          }

  }
  doSelectPallet(client_po_no, item_barcode, pallet_no, qty, uom){
    let data = { 'client_po_no': client_po_no, 'item_barcode': item_barcode, 'pallet_no': pallet_no, 'qty': qty, 'uom': uom };
    this.viewCtrl.dismiss(data);
  }
  doSelectPalletForWork(pallet_to, item_code, description, qty, uom){
    let data = { 'pallet_to': pallet_to, 'item_code': item_code, 'description': description, 'qty': qty, 'uom': uom };
    this.viewCtrl.dismiss(data);
  }
  doGetPallet(oClient, oReceipt){
    this.presentLoading();
    this.service.get_Pallet_List(oClient, oReceipt).then((res)=>{
      this.data_pallet = res;
      console.log(this.data_pallet);
      this.finishLoding();
      this.initializeItems();
    })
  }
  doGetPalletReplenishment(oClient, oPallet){
    this.presentLoading();
    this.service.get_Pallet_For_Replenishment(oClient, oPallet).then((res)=>{
      this.data_pallet_for_rep = res;
      console.log(this.data_pallet_for_rep);
      this.finishLoding();
      this.initializeItems();
    })
  }
  doGetPalletTobyWorks(oWorksOrder){
    this.presentLoading();
    this.service.get_Pallet_To_by_Works(oWorksOrder).then((res)=>{
      this.data_pallet_for_workorder = res;
      console.log(this.data_pallet_for_workorder);
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
