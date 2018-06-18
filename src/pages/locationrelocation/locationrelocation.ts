import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, Content, AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

import { Service } from '../../services/service';

import { WarehousemodalPage } from '../modal/warehousemodal/warehousemodal';
import { LocationmodalPage } from '../modal/locationmodal/locationmodal';

@Component({
  selector: 'page-locationrelocation',
  templateUrl: 'locationrelocation.html'
})
export class LocationrelocationPage {
  @ViewChild('focusInputWH') InputWH;
  @ViewChild('focusInputLoc') InputLoc;
  @ViewChild('focusInputDestLoc') InputDestLoc;
  @ViewChild(Content) content: Content;

  data_listPallet:any;
  data_move:any;
  oWH:any;
  oLoc:any;
  oLocDes:any;
  oUsername:any;
  data_return_Putaway:any;
  constructor(public navCtrl: NavController, private service: Service, private toastCtrl: ToastController, public platform: Platform
    ,private modalCtrl: ModalController, private storage: Storage, private keyboard: Keyboard, private alertCtrl: AlertController) {
    this.storage.get('_user').then((res)=>{
      this.oUsername = res;
      console.log(this.oUsername);
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
          this.InputWH.setFocus();
    },0);
    setTimeout(()=>{
        this.InputWH.setFocus();
        this.keyboard.close();
    },100);
  }
  updateScroll() {
      console.log('updating scroll')
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 300)
    }
  doGetWH(){
    let profileModal = this.modalCtrl.create(WarehousemodalPage);
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oWH = data.warehouse;

          setTimeout(()=>{
              this.keyboard.close();
              this.InputLoc.setFocus();
          },0);
          setTimeout(()=>{
              this.InputLoc.setFocus();
              this.keyboard.close();
          },100);
        }else{

        }
      });
  }
  doGetLocationAll(oWH, oLoc){
    let profileModal = this.modalCtrl.create(LocationmodalPage, { oWH: oWH, oLOC_DESC: oLoc });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oLoc = data.destLoc;

          this.doGetListPalletInLocation(oWH, this.oLoc);
        }else{

        }
      });
  }
  doGetLocationAll_NotGetDetail(oWH, oLocDes){
    let profileModal = this.modalCtrl.create(LocationmodalPage, { oWH: oWH, oLOC_DESC: oLocDes });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oLocDes = data.destLoc;
        }else{

        }
      });
  }
  doGetListPalletInLocation(oWH, oLoc){
    this.service.get_ListPalletInLocation(oWH, oLoc).then((res)=>{
      this.data_listPallet = res;
      console.log(this.data_listPallet);
      if(this.data_listPallet <= 0){
        this.presentToast('ไม่มีข้อมูล', false, 'bottom');
      }else{
        setTimeout(()=>{
            this.keyboard.close();
            this.InputDestLoc.setFocus();
        },0);
        setTimeout(()=>{
            this.InputDestLoc.setFocus();
            this.updateScroll();
            this.keyboard.close();
        },100);
      }
    })
  }
  doClickMove(oWH, oLoc, oDestLoc){
      if(oWH == undefined || oWH == ""){
        this.presentToast('Please specify Warehouse.', false, 'bottom');
      }else if (oLoc == undefined || oWH == ""){
        this.presentToast('Please specify Location.', false, 'bottom');
      }else{
        this.doGetListPalletInLocation(oWH, oLoc);
        if (this.data_listPallet == undefined || this.data_listPallet == null){
          let alert = this.alertCtrl.create({
               title: 'Error',
               subTitle: 'Error! Not Data For Relocation.',
               buttons: [ {
                   text: 'ตกลง',
                   handler: data => {
                     // this.nav.setRoot(HomePage)
                   }
                 }]
             });
              alert.present()
          // this.presentToast('Error! Not Data For Relocation.', false, 'bottom');
        }else{
          this.doConfirmLocationRelocation(oWH, oLoc, oDestLoc);

        }
      }
  }
  doConfirmLocationRelocation(oSRCWhse, oSRCLoc, oDestLoc){
    // console.log(oSRCWhse, oSRCLoc, oDestLoc, this.oUsername["0"].username);
    this.service.get_ConfirmLocationRelocation(oSRCWhse, oSRCLoc, oDestLoc, this.oUsername).then((res)=>{
      this.data_move = res;
      console.log(this.data_move);

      if(this.data_move.sqlstatus != '0'){
        let alert = this.alertCtrl.create({
             title: 'Error',
             subTitle: this.data_move.sqlmsg,
             buttons: [ {
                 text: 'ตกลง',
                 handler: data => {
                   // this.nav.setRoot(HomePage)
                 }
               }]
           });
            alert.present()
          // this.presentToast(this.data_move.sqlmsg, false, 'bottom');
      }else{
        this.presentToast(this.data_move.sqlmsg, false, 'bottom');
        this.oLoc = oDestLoc;
        this.doGetListPalletInLocation(oSRCWhse, this.oLoc);
      }
    });
  }
  doClear(){
    this.data_listPallet = [];
    this.oWH = "";
    this.oLoc = "";
    this.oLocDes = "";

    setTimeout(()=>{
        this.keyboard.close();
          this.InputWH.setFocus();
    },0);
    setTimeout(()=>{
        this.keyboard.close();
    },100);
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
