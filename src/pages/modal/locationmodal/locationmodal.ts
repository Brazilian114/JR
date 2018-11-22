import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, IonicPage } from 'ionic-angular';

import { Service } from '../../../services/service';

@IonicPage(
  {name:'LocationmodalPage',
  segment: 'Locationmodal'}
)
@Component({
  selector: 'page-locationmodal',
  templateUrl: 'locationmodal.html'
})
export class LocationmodalPage {
  data_location:any;
  data_stock:any;
  oClient:any;
  oItemNo:any;
  oWarehouse:any;
  oLocation:any;
  oStockRef:any;
  loader:any;
  oLOC_DESC:any;
  oLOC:any;
  oUom:any;
  oQtyPick:any;
  oZone:any;
  oGrade:any;
  oPalletFrom:any;
  items: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private service: Service,
     private loadingCtrl: LoadingController, private alertCtrl: AlertController) {

    this.oClient = navParams.get('oClient');
    this.oItemNo = navParams.get('oItem');
    this.oWarehouse = navParams.get('oWH');
    this.oLOC_DESC = navParams.get('oLOC_DESC');
    this.oLOC = navParams.get('oLOC');
    this.oLocation = navParams.get('oLocation');
    this.oStockRef = navParams.get('oStockRef');
    this.oUom = navParams.get('oUom');
    this.oQtyPick = navParams.get('oQtyPick');
    this.oZone = navParams.get('oZone');
    this.oGrade = navParams.get('oGrade');
    this.oPalletFrom = navParams.get('oPalletFrom');

    console.log(this.oZone);

    if(this.oItemNo != undefined || this.oItemNo != null){
      if(this.oWarehouse != undefined || this.oWarehouse != null){
          if(this.oLOC_DESC == undefined && this.oQtyPick == undefined){
            this.oLOC_DESC = "";
            this.doGetLocation_PalletRelo(this.oClient, this.oItemNo, this.oWarehouse, this.oLOC_DESC, this.oLOC);
          }else if(this.oQtyPick != undefined || this.oQtyPick != null){
            if(this.oPalletFrom == undefined){
              this.oPalletFrom = "";
              this.doGetStockPickbyOrder(this.oClient, this.oItemNo, this.oUom, this.oQtyPick, this.oWarehouse, this.oZone, this.oGrade, this.oPalletFrom);
            }else{
              this.doGetStockPickbyOrder(this.oClient, this.oItemNo, this.oUom, this.oQtyPick, this.oWarehouse, this.oZone, this.oGrade, this.oPalletFrom);
            }
          }else{
            this.doGetLocation_PalletRelo(this.oClient, this.oItemNo, this.oWarehouse, this.oLOC_DESC, this.oLOC);
          }
      }else{
        this.doGetLocation(this.oClient, this.oItemNo, this.oWarehouse, this.oLOC_DESC, this.oLOC);
      }
    }else if(this.oStockRef != undefined || this.oStockRef != null){
      if(this.oLocation == undefined){
        this.oLocation = "";
        this.doGetLocationStk(this.oClient, this.oStockRef, this.oWarehouse, this.oLocation);
      }else{
        this.doGetLocationStk(this.oClient, this.oStockRef, this.oWarehouse, this.oLocation);
      }

    }else{
      if(this.oLOC_DESC == undefined && this.oZone == undefined){
        this.oLOC_DESC = "";
        this.doGetLocationAll(this.oWarehouse, this.oLOC_DESC);
      }
      else{
        if(this.oZone != undefined){
          console.log("else if Zone location")
          this.doGetLocation_zone(this.oZone);
        }
        else{
          this.doGetLocationAll(this.oWarehouse, this.oLOC_DESC);
        }
      }
    }

  }
  initializeItems() {
    if(this.data_location == undefined){
        this.items = this.data_stock;
    }else{
        this.items = this.data_location;
    }

  }
  onInput(ev: any){
         this.initializeItems();
          console.log(this.items);
        let val = ev.target.value;
        if(val && val.trim() != ''){
          this.items = this.items.filter((item)=>{
            return (item.location["0"].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
  }
  doSelectItem(destLoc, warehouse, zone){
    let data = { 'destLoc': destLoc, 'warehouse': warehouse, 'zone': zone};
    this.viewCtrl.dismiss(data);
  }
  doGetLocation(oClient, oItemNO, oWH, oLOC_DESC, oLOC){
    if(oLOC_DESC == undefined){
      oLOC_DESC = "";

      this.presentLoading();
      this.service.get_itemrelocation(oClient, oItemNO, oWH, oLOC_DESC, oLOC).then((res)=>{
        this.data_location = res;
        console.log(this.data_location);
        if(this.data_location.length <= 0){
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'ไม่พบโลเคชั่นนี้ในระบบ',
            buttons: [ {
                text: 'ตกลง',
                handler: data => {

                }
              }]
          });
          alert.present();
        }
        this.finishLoding();
        this.initializeItems();
      })
    }

  }
  doGetStockPickbyOrder(oClient, oItemNo, oUom, oQtyPick, oWarehouse, oZone, oGrade, oPalletFrom){
    this.service.get_Stock_Pick_by_Order(oClient, oItemNo, oUom, oQtyPick, oWarehouse, oZone, oGrade, oPalletFrom).then((res)=>{
      this.data_stock = res;
      console.log(this.data_stock);
      this.initializeItems();
    })
  }
  doGetLocationAll(oWarehouse, oLOC_DESC){
    this.presentLoading();
    this.service.get_location_all(oWarehouse, oLOC_DESC).then((res)=>{
      this.data_location = res;
      console.log(this.data_location);
      if(this.data_location.length <= 0){
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'ไม่พบโลเคชั่นนี้ในระบบ',
          buttons: [ {
              text: 'ตกลง',
              handler: data => {

              }
            }]
        });
        alert.present();
      }
      this.finishLoding();
      this.initializeItems();
    })
  }
  doGetLocation_PalletRelo(oClient, oItemNO, oWH, oLOC_DESC, oLOC){
    this.presentLoading();
    this.service.get_itemrelocation(oClient, oItemNO, oWH, oLOC_DESC, oLOC).then((res)=>{
      this.data_location = res;
      console.log(this.data_location);
      this.finishLoding();
      this.initializeItems();
    })
  }

  doGetLocation_zone(oZone){
    this.presentLoading();
    this.service.get_location_zone("",oZone).then((res)=>{
      this.data_location = res;
      console.log(this.data_location);
      this.finishLoding();
      this.initializeItems();
    })
  }

  doGetLocationStk(oClient, oStockRef, oWarehouse, oLocation){
    this.service.get_StockCountListLocation_LocPage(oClient, oStockRef, oWarehouse, oLocation).then((res)=>{
      this.data_location = res;
      console.log(this.data_location);
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
