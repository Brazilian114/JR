import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, Content, AlertController, Platform, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

import { Service } from '../../services/service';

@IonicPage(
  {name:'ItemrelocationPage',
  segment: 'Itemrelocation'}
)

@Component({
  selector: 'page-itemrelocation',
  templateUrl: 'itemrelocation.html'
})
export class ItemrelocationPage {
  @ViewChild('focusInputPallet') InputPallet;
  @ViewChild('focusInputDestLoc') InputDestLoc;
  @ViewChild('focusInputDestPit') InputDestPit;
  @ViewChild(Content) content: Content;

  data_client:any;
  data_item:any;
  data_item_relocation:any;
  data_new_pallet:any;
  oClient:any;
  oDes:any = null;
  oItem:any = null;
  oDestLoc: any;
  oDestPit: any;
  oGrade:any;
  listGrade:any;
  listMove:any;
  oWH: any;
  oLOC: any;
  oLocation: any;
  oUOM: any;
  oQty: any;
  oSQty: any;
  oSrcPallet: any;
  oRec:any ;
  oUsername:any;
  oPallet:any;
  constructor(public navCtrl: NavController, private service: Service, private toastCtrl: ToastController, public platform: Platform
    , private modalCtrl: ModalController, private storage: Storage, private keyboard: Keyboard, private alertCtrl: AlertController) {
      this.storage.get('_user').then((res)=>{
        this.oUsername = res;
        this.oClient = this.oUsername
      })
  }
  ionViewDidEnter() {
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
  doClick(){
    this.updateScroll();
  }

  updateScroll() {
      console.log('updating scroll')
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 300)
    }
    LocDestEnter(){
      this.InputDestPit.setFocus();
    }

  doGetItemNo(oClient, oItem, flag){
    console.log(oItem);
        let profileModal = this.modalCtrl.create("ItemNomodalPage", { oClient: oClient });
          profileModal.present();
          profileModal.onDidDismiss(data =>{
            console.log(data);
            if(data != undefined){
              this.oItem = data.itemNo;
              this.oDes = data.description;

              this.doGetGrade();
              this.doGetItemDetail(oClient, this.oItem);
            }else{

            }
          });
  }
  
  doGetLocation(oClient, oItem, oWH, oLOC_DESC, oLocation){
    if(oClient == undefined || oClient == ""){
      this.presentToast('โปรดระบุ Client.', false, 'bottom');
    }
    else if(oItem == undefined || oItem == ""){
      this.presentToast('โปรดระบุ Item.', false, 'bottom');
    }
    else if(oWH == undefined || oWH == ""){
      this.presentToast('โปรดระบุ Warehouse.', false, 'bottom');
    }

    else if(oLocation == undefined || oLocation == ""){
      this.presentToast('โปรดระบุ Location', false, 'bottom');
    }

    else{
      let profileModal = this.modalCtrl.create("LocationmodalPage", { oClient: oClient, oItem: oItem, oWH: oWH, oLOC_DESC: oLOC_DESC, oLOC: oLocation});
        profileModal.present();
        profileModal.onDidDismiss(data =>{
          console.log(data);
          if(data != undefined){
            this.oDestLoc = data.destLoc;

            setTimeout(()=>{
                this.keyboard.close();
                  this.InputDestPit.setFocus();
            },0);
            setTimeout(()=>{
                this.keyboard.close();
                this.updateScroll();
            },100);
          }else{

          }
        });
      }
    }
  doGetNewPallet(oClient){
    if(oClient != ""){
      console.log(oClient);
      this.service.get_new_pallet(oClient).then((res)=>{
        this.data_new_pallet = res;
        console.log(this.data_new_pallet)
        this.oDestPit = this.data_new_pallet.Column1;
      })
    }
  }
  doGetGrade(){
    this.service.get_Grade().then((res) =>{
      this.listGrade = res;
      this.oGrade = this.listGrade["0"].param_code;
      console.log(this.listGrade);
    })
  }

  doGetItemDetail(oClient, oItem){
    this.service.get_ListItemInPalletLocation(oClient, oItem).then((res) =>{
      this.data_item = res;
      console.log("test",this.data_item);
      if(this.data_item.length <= 0){
        this.presentToast('ไม่พบ Item นี้', false, 'bottom');
      }else{
        this.doGetGrade();
      }
    })
  }

  doReturnItemDetail(description, grade, item_code, item_no, location, qty_avail, rec_num, uom, warehouse, oPallet){
    this.doGetGrade();
    this.oLocation = location;
    this.oWH = warehouse;
    this.oUOM = uom;
    this.oQty = qty_avail;
    this.oSrcPallet = oPallet;
    this.oRec = rec_num;
    this.oGrade = grade;
    this.oItem = item_code;
    this.oDes = description;
    this.oSQty = qty_avail;

    // this.storage.set('_oQty', qty_avail);

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

  doClear(){
    this.oItem = "";
    this.oDes = "";
    this.oDestLoc = "";
    this.oGrade = null;
    this.oDestPit = "";
    this.oLocation = "";
    this.oWH = "";
    this.oUOM = "";
    this.oQty = null;
    this.oSrcPallet = "";
    this.oRec = "";
  }
  doClearAll(){
    this.oItem = "";
    this.oDes = "";
    this.oDestLoc = "";
    this.oGrade = null;
    this.oDestPit = "";
    this.oLocation = "";
    this.oWH = "";
    this.oUOM = "";
    this.oQty = null;
    this.oSrcPallet = "";
    this.oRec = "";
    this.oPallet = "";
    this.data_item = []
  }
  doMove(oSrcPallet,  oDestWhse,  oDestLoc,  oDestPallet,  oClient,  oItem,  oSrcRec,  oQty,  oUOM){
    if(oDestLoc == undefined || oDestLoc == ""){
      this.presentToast('โปรดระบุ Dest Location.', false, 'bottom');
    }
    else if(oDestPallet == undefined || oDestPallet == ""){
      this.presentToast('โปรดระบุ Dest Pallet.', false, 'bottom');
    }
    else if(oClient == undefined || oClient == ""){
      this.presentToast('โปรดระบุ Dest Client.', false, 'bottom');
    }
    else if(oItem == undefined || oItem == ""){
      this.presentToast('โปรดระบุ Dest Item.', false, 'bottom');
    }
    else{
        console.log(oQty);
        console.log(this.oSQty);
        if(oSrcPallet == oDestPallet){
          console.log("1");

          console.log(oQty);
          if(this.oSQty == oQty){
            console.log("2");
              this.doItemRelocation(oSrcPallet,  oDestWhse,  oDestLoc,  oDestPallet,  oClient,  oItem,  oSrcRec,  oQty,  oUOM);

          }else{
            let alert = this.alertCtrl.create({
                 title: 'Error',
                 subTitle: 'มีการแบ่งจำนวนสินค้า กรุณาสร้าง Pallet ใหม่',
                 buttons: [ {
                     text: 'ตกลง',
                     handler: data => {
                       // this.nav.setRoot(HomePage)
                     }
                   }]
               });
                alert.present()
          }
        }else{
            this.doItemRelocation(oSrcPallet,  oDestWhse,  oDestLoc,  oDestPallet,  oClient,  oItem,  oSrcRec,  oQty,  oUOM);
        }
    }
  }
  doItemRelocation(oSrcPallet,  oDestWhse,  oDestLoc,  oDestPallet,  oClient,  oItem,  oSrcRec,  oQty,  oUOM){
    console.log("ตัวแปรที่ส่งไป",oSrcPallet,  oDestWhse,  oDestLoc,  oDestPallet,  oClient,  oItem,  oSrcRec,  oQty,  oUOM);
    this.service.item_Relocation(oSrcPallet+"0",  oDestWhse,  oDestLoc,  oDestPallet+"0",  oClient,  oItem,  oSrcRec,  oQty,  oUOM, this.oUsername).then((res) =>{
      this.data_item_relocation = res;
      console.log("data_item_relocation",this.data_item_relocation);

      if(this.data_item_relocation["0"].retval =="0"){
      // this.presentToast("New Rec num"+this.data_item_relocation["0"].new_rec_num, false, 'bottom');
      let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: this.data_item_relocation["0"].sqlmsg +' New Recnum'+ this.data_item_relocation["0"].new_rec_num,
        buttons: [ {
            text: 'ตกลง',
            handler: data => {
              // this.nav.setRoot(HomePage)
            }
          }]
      });
      alert.present();
      this.doClear();
        this.doGetListItemInPallet_ByPallet(oClient, oDestPallet);
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: this.data_item_relocation["0"].sqlmsg,
          buttons: [ {
              text: 'ตกลง',
              handler: data => {
                // this.nav.setRoot(HomePage)
              }
            }]
        });
        alert.present();
      }
    })
  }
  doGetListItemInPallet_ByPallet(oClient, oPallet){
      console.log(oClient, oPallet);
    this.service.get_ListItemInPalletLocation_ByPallet(oClient, oPallet+"0").then((res)=>{
      this.data_item = res;

      console.log(this.data_item);
    })
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
