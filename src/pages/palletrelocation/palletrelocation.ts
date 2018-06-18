import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController, Content, AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

import { ItemNomodalPage } from '../modal/itemNo-modal/itemNo-modal';
import { LocationmodalPage } from '../modal/locationmodal/locationmodal';

import { Service } from '../../services/service';

@Component({
  selector: 'page-palletrelocation',
  templateUrl: 'palletrelocation.html'
})
export class PalletrelocationPage {
  @ViewChild('focusInputScanPallet') myInputScanPallet;
  @ViewChild('focusInputLocation_Confirm') myInputLocation_Confirm;
  @ViewChild(Content) content: Content;

  oClient:any = "001";
  oUsername:any;
  oPallet:any;
  oDes:any;
  oItem:any;
  oWH:any;
  oNWH:any;
  oNLoc:any;
  oLoc:any;
  oLot:any;
  oBatch:any;
  oRecNum:any;
  oGrade:any;
  data_item:any;
  data_move:any;
  loader:any;
  constructor(public navCtrl: NavController, private service: Service, private loadingCtrl: LoadingController, private toastCtrl: ToastController
    , private modalCtrl: ModalController, private storage: Storage, private keyboard: Keyboard, private alertCtrl: AlertController, public platform: Platform) {
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
        this.myInputScanPallet.setFocus();

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

  doGetItemNo(oClient){
    let profileModal = this.modalCtrl.create(ItemNomodalPage, { oClient: oClient });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oItem = data.itemNo;
          this.oDes = data.description;
        }else{

        }
      });
  }
  doGetLocation(oClient, oItem, oWH, oLoc, oNLoc){
    let profileModal = this.modalCtrl.create(LocationmodalPage, { oClient: oClient, oItem: oItem, oWH: oWH , oLOC: oLoc, oLOC_DESC: oNLoc });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        if(data != undefined){
          this.oNLoc = data.destLoc;
          this.oNWH = data.warehouse;
        }else{

        }
      });
  }
  doGetListItemInPallet_ByPallet(oClient, oPallet){
      console.log(oClient, oPallet);
    this.service.get_ListItemInPalletLocation_ByPallet(oClient, oPallet+"0").then((res)=>{
      this.data_item = res;
      console.log(this.data_item);
      if(this.data_item.length <= 0){
        this.Alert('Error', 'ไม่พบ Pallet ในระบบ');
      }else{
        this.oItem = this.data_item["0"].item_no["0"];
        this.oLoc = this.data_item["0"].location["0"];
        this.oDes = this.data_item["0"].description["0"];
        this.oWH = this.data_item["0"].warehouse["0"];
        this.oBatch = this.data_item["0"].batch_no["0"];
        this.oLot = this.data_item["0"].lot_no["0"];
        this.oGrade = this.data_item["0"].grade["0"];
        setTimeout(()=>{
            this.keyboard.close();
            this.myInputLocation_Confirm.setFocus();

        },0);
        setTimeout(()=>{
            this.myInputLocation_Confirm.setFocus();
            this.keyboard.close();
        },2000);
      }
    })
  }
  // doGetListItemInPallet_ByPallet_ByRecNum(oClient, oPallet){
  //     console.log(oClient, oPallet);
  //   this.service.get_ListItemInPalletLocation_ByPallet_ByRecNum(oClient, oPallet+"0", this.oRecNum).then((res)=>{
  //     this.data_item = res;
  //     console.log(this.data_item);
  //   })
  // }
  doReturnItemDetail(item_no,description,warehouse,location,lot_no,batch_no,rec_num,grade){
    this.oWH = warehouse;
    this.oItem = item_no;
    this.oDes = description;
    this.oLot = lot_no;
    this.oBatch = batch_no;
    this.oLoc = location;
    this.oRecNum = rec_num;
    this.oGrade = grade;

  }
  doMove(oPallet, oDestWhse, oDestLoc){
    if(oDestLoc == undefined || oDestLoc == ""){
      this.presentToast('กรุณากรอก Location', false, 'bottom');
    }else if(this.oLoc == oDestLoc){
        this.presentToast('กรุณาเปลี่ยน Location', false, 'bottom');
      }else{
      this.service.get_ConfirmPalletRelocation(oPallet+"0", oDestWhse, oDestLoc, this.oGrade, this.oUsername).then((res)=>{
        this.data_move = res;
        console.log(this.data_move);
        if(this.data_move.sqlstatus != "0"){
          this.Alert('Error', this.data_move.sqlmsg);
        }else{
            this.Alert('Succees', this.data_move.sqlmsg);
            this.doGetListItemInPallet_ByPallet(this.oClient, oPallet);
            this.oNLoc = "";
        }
      })
    }
  }
  doClear(){
    this.oWH = "";
    this.oItem = "";
    this.oDes = "";
    this.oLot = "";
    this.oBatch = "";
    this.oLoc = "";
    this.oRecNum = "";
    this.oGrade = "";
    this.oNLoc = "";
    this.data_item = null;
    this.oPallet = "";
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
}
