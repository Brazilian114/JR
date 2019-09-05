import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, Content, AlertController, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Service } from '../../services/service';

@IonicPage(
  {name:'StockListPage',
  segment: 'StockList'}
)

@Component({
  selector: 'page-stocklist',
  templateUrl: 'stocklist.html'
})
export class StockListPage {
  @ViewChild('focusInputPallet') InputPallet;
  @ViewChild('focusInputDestLoc') InputDestLoc;
  @ViewChild('focusInputDestPit') InputDestPit;
  @ViewChild(Content) content: Content;

  data_barcode_master:any;

  oClient:any;
  oUsername:any;
  oCheck_Item:any = true;
  oCheck_Location:any = false;

  oBarcode:any = "";
  oUom:any = "";
  oItem:any = "";
  oItem_Des:any = "";

  oWarehouse:any = "WH01";
  oLocation:any = "";
  oLocation_Des:any = "";

  constructor(public navCtrl: NavController, private service: Service, private toastCtrl: ToastController, private modalCtrl: ModalController
    , private storage: Storage, private alertCtrl: AlertController) {
      this.storage.get('_user').then((res)=>{
        this.oUsername = res;
        this.oClient = this.oUsername;
      })
  }
  ionViewDidEnter(){

  }
  updateoCheck_Item(oCheck_Item){
    console.log(oCheck_Item);
    this.oCheck_Location = false;
    this.doClearLocation();
  }
  updateoCheck_Location(oCheck_Location){
    console.log(oCheck_Location);
    this.oCheck_Item = false;
    this.doClearItem();
  }
  updateScroll() {
      console.log('updating scroll')
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 300)
    }
  doGetBarcodeMasterEkapab(oClient, oBarcode, oItemNo, oUom){
    if(oBarcode == undefined || oBarcode == ""){
      this.presentToast('กรุณากรอกข้อมูล Barcode', false, 'bottom');
    }else{
      this.service.get_BarcodeMaster_Ekapab(oClient, oBarcode).then((res)=>{
        this.data_barcode_master = res;
        console.log(this.data_barcode_master);

        if(this.data_barcode_master.length <= 0){
          this.presentToast('ไม่พบข้อมูล', false, 'bottom');
        }else{
          this.oItem = this.data_barcode_master["0"].item_no;
          this.oUom = this.data_barcode_master["0"].uom;
          this.oItem_Des = this.data_barcode_master["0"].description;

          this.doShowStockListItem(oClient, oBarcode, this.oItem, this.oUom);
        }
      })
    }

  }
  doShowStockListItem(oClient, oBarcode, oItemNo, oUom){
    this.service.show_StockList_Item(oClient, oBarcode, oItemNo, oUom).then((res)=>{
      this.data_barcode_master = res;
      console.log(this.data_barcode_master);
    })
  }
  doShowStockListLocation(oClient, oWarehouse, oLocation){
    this.service.show_StockList_Location(oClient, oWarehouse, oLocation).then((res)=>{
      this.data_barcode_master = res;
      console.log(this.data_barcode_master);
    })

  }
  doGetLocationAll(oWH, oLoc, oClient, oWarehouse){
    let profileModal = this.modalCtrl.create("LocationmodalPage", { oWH: oWH, oLOC_DESC: oLoc });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oLocation = data.destLoc;

          this.doShowStockListLocation(oClient, oWarehouse, this.oLocation);
        }else{

        }
      });
  }
  doClearItem(){
    this.oItem = "";
    this.oUom = "";
    this.oItem_Des = "";
    this.oBarcode = "";
    this.data_barcode_master = null;
  }
  doClearLocation(){
    this.oLocation = "";
    this.oLocation_Des = "";
    this.data_barcode_master = null;
  }
  Alert(title, subTitle){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [ {
          text: 'ตกลง',
          handler: data => {

          }
        }]
    });
    alert.present();
  }
  presentToast(key, showCloseButton, position: string) {
    const toast = this.toastCtrl.create({
      message: key,
      showCloseButton: showCloseButton,
      closeButtonText: 'Ok',
      duration: 2000,
      position : position
    });
    toast.present();
  }
}
