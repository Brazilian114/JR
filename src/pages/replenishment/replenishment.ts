import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, Content, AlertController, Platform, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

import { Service } from '../../services/service';

@IonicPage(
  {name:'ReplenishmentPage',
  segment: 'Replenishment'}
)
@Component({
  selector: 'page-replenishment',
  templateUrl: 'replenishment.html'
})
export class ReplenishmentPage {
  @ViewChild('focusInputPallet') InputPallet;
  @ViewChild('focusInputDestLoc') InputDestLoc;
  @ViewChild('focusInputQty') InputQty;
  @ViewChild('focusInputBarcode') InputBarcode;
  @ViewChild('focusInputBarcode_Dest') InputBarcode_Dest;
  @ViewChild(Content) content: Content;

  data_pallet:any;
  data_barcode_dest:any;
  data_close:any;

  oClient:any = "GTP";
  oDes:any = null;
  oItem:any = null;
  oRecNum:any;
  oLOC_DESC:any;
  oWH: any;
  oNWH: any;
  oLoc: any;
  oUOM: any;
  oQty: any;
  oUOM_Dest: any;
  oQty_Dest: any;
  oBarcode:any;
  oBarcode_Dest:any;
  oUsername:any;
  oPallet:any;
  constructor(public navCtrl: NavController, private service: Service, private toastCtrl: ToastController, private modalCtrl: ModalController
    , private storage: Storage, private keyboard: Keyboard, private alertCtrl: AlertController, public platform: Platform) {
      this.storage.get('_user').then((res)=>{
        this.oUsername = res;
      })
  }
  doClick(){
    this.updateScroll();
  }
  ionViewDidEnter(){
    this.platform.ready().then(() => {
      this.keyboard.disableScroll(true);
    });
    setTimeout(()=>{
        this.keyboard.close();
          this.InputPallet.setFocus();
    },0);
    setTimeout(()=>{
        this.keyboard.close();
    },100);
  }
  updateScroll() {
      console.log('updating scroll')
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 300)
    }
  doGetLocation(oNWH, oLOC_DESC){
      let profileModal = this.modalCtrl.create("LocationmodalPage", { oWH: oNWH, oLOC_DESC: oLOC_DESC });
        profileModal.present();
        profileModal.onDidDismiss(data =>{
        console.log(data);
          if(data != undefined){
            this.oLOC_DESC = data.destLoc;
          }else{

          }
        });
  }
  doGetPalletForReplenishment(oClient, oPallet){
    if(oPallet == undefined || oPallet == ""){
      this.Alert('Error', 'Please fill out the Pallet.')
    }else{
      console.log(oClient, oPallet);
      let profileModal = this.modalCtrl.create("PalletmodelPage", { oClient: oClient, oPallet: oPallet});
        profileModal.present();
        profileModal.onDidDismiss(data =>{
          console.log(data);
          if(data != undefined){

          }else{

          }
        });
    }
  }
  doGetDataPalletForReplenishment(oClient, oPallet, oBarcode){
    this.service.get_Data_Pallet_For_Replenishment(oClient, oPallet, oBarcode).then((res)=>{
      this.data_pallet = res;
      console.log(this.data_pallet);

      if(this.data_pallet["0"].sqlstatus != 0){
        this.Alert('Error', this.data_pallet["0"].sqlmsg+' '+this.data_pallet["0"].sqlmsg2);
      }else{

        this.oItem = this.data_pallet["0"].item_no;
        this.oRecNum = this.data_pallet["0"].rec_num;
        this.oDes = this.data_pallet["0"].description;
        this.oQty = this.data_pallet["0"].qty_avail;
        this.oUOM = this.data_pallet["0"].item_packing;
        this.oWH = this.data_pallet["0"].warehouse;
        this.oNWH = this.data_pallet["0"].warehouse;
        this.oLoc = this.data_pallet["0"].location;

        setTimeout(()=>{
            this.InputBarcode_Dest.setFocus();
        },1000);
      }
    })
  }
  doGetDataBarcodeForReplenishment(oClient, oBarcodeFr, oQty, oUom, oBarcodeTo){
    if(oBarcodeFr == undefined || oBarcodeFr == ""){
      this.presentToast('โปรดกรอก Barcode', false, 'bottom');
    }else if(oBarcodeTo == undefined || oBarcodeTo == ""){
      this.presentToast('โปรดกรอก Barcode', false, 'bottom');
    }else if(oQty == undefined || oQty == ""){
      this.presentToast('โปรดกรอก Qty', false, 'bottom');
    }else{
      this.service.get_Data_Barcode_For_Replenishment(oClient, oBarcodeFr, oQty, oUom, oBarcodeTo).then((res)=>{
        this.data_barcode_dest = res;
        console.log(this.data_barcode_dest);

        if(this.data_barcode_dest["0"].sqlstatus != 0){
          this.Alert('Error', this.data_barcode_dest["0"].sqlmsg+' '+this.data_barcode_dest["0"].sqlmsg2);
        }else{

          this.oQty_Dest = this.data_barcode_dest["0"].qty;
          this.oUOM_Dest = this.data_barcode_dest["0"].uom;

          setTimeout(()=>{
              this.InputDestLoc.setFocus();
          },0);
          setTimeout(()=>{
              this.updateScroll();
          },2000);
        }
      })
    }
  }
  doGetBarcodeDetail(oClient, oBarcode, oItem, oUOM){
    // if(oItem == undefined){
      this.oItem = "";
      this.oUOM = "";

      let profileModal = this.modalCtrl.create("BarcodemodelPage", { oClient: oClient, oBarcode: oBarcode, oItemNo: this.oItem, oUOM: this.oUOM  });
        profileModal.present();
        profileModal.onDidDismiss(data =>{
        console.log(data);
        });
    // }else{
    //
    // }
  }
  doScanPallet(){
    setTimeout(()=>{
        this.keyboard.close();
          this.InputBarcode.setFocus();
    },0);
    setTimeout(()=>{
          this.InputBarcode.setFocus();
        this.keyboard.close();
    },200);
  }
  doConfirm(oRecNum, oClient, oItem, oWarehouse, oLocationFR, oPallet, oLocationTO, oBarcodeFR, oBarcodeTO, oQtyFR, oUomFR, oQtyTO, oUomTO){
    if(oPallet == undefined || oPallet == ""){
      this.presentToast('โปรดกรอก Pallet', false, 'bottom');
    }else if(oBarcodeFR == undefined || oBarcodeFR == ""){
      this.presentToast('โปรดกรอก Barcode', false, 'bottom');
    }else if(oQtyFR == undefined || oQtyFR == ""){
      this.presentToast('โปรดกรอกจำนวน', false, 'bottom');
    }else if(oBarcodeTO == undefined || oBarcodeTO == ""){
      this.presentToast('โปรดกรอก Barcode To', false, 'bottom');
    }else if(oLocationTO == undefined || oLocationTO == ""){
      this.presentToast('โปรดกรอก Location', false, 'bottom');
    }else{
      this.service.closed_Replenishment(oRecNum, oClient, oItem, oWarehouse, oLocationFR, oPallet, oLocationTO, oBarcodeFR, oBarcodeTO, oQtyFR, oUomFR, oQtyTO, oUomTO, this.oUsername).then((res)=>{
        this.data_close = res;
        console.log(this.data_close);

        if(this.data_close["0"].sqlstatus != 0){
          this.Alert('Error', this.data_close["0"].sqlmsg+' '+this.data_close["0"].sqlmsg2);
        }else{
          this.Alert('Success', this.data_close["0"].sqlmsg+' '+this.data_close["0"].sqlmsg2);
          this.doClear();
        }
      })
    }
  }
  doClear(){
    this.oItem = "";
    this.oDes = "";
    this.oLOC_DESC = "";
    this.oLoc = "";
    this.oWH = "";
    this.oNWH = "";
    this.oUOM = "";
    this.oUOM_Dest = "";
    this.oQty_Dest = "";
    this.oQty = "";
    this.oBarcode = "";
    this.oBarcode_Dest = "";
    this.oPallet = "";
    this.oRecNum = "";

    setTimeout(()=>{
        this.keyboard.close();
          this.InputPallet.setFocus();
    },0);
    setTimeout(()=>{
        this.keyboard.close();
    },2000);
  }
  doStockList(){
      this.navCtrl.push("StockListPage");
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
