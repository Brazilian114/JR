import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController, Content, AlertController, IonicPage } from 'ionic-angular';

import { Keyboard } from '@ionic-native/keyboard';
import { Service } from '../../services/service';

@IonicPage(
  {name:'IteminvquePage',
  segment: 'Iteminvque'}
)

@Component({
  selector: 'page-iteminvque',
  templateUrl: 'iteminvque.html'
})
export class IteminvquePage {
  @ViewChild('focusInputItem') InputItem;
  @ViewChild('focusInputBarcode') InputBarcode;
  @ViewChild(Content) content: Content;

  oClient:string = "GTP";
  oDes:string = null;
  oItem:string = null;
  oQty:any;
  oUOM:any;
  oBarcode:string;
  listType:any;
  oGrade:any;
  data_item:any;
  data_showlist:any;
  data_grade:any;
  data_getBarcode:any;
  data_uom:any;
  oReceiptNO:string = "";
  oPONo:string = "";
  loader:any;
  constructor(public navCtrl: NavController, private service: Service, private loadingCtrl: LoadingController, private toastCtrl: ToastController
    , private modalCtrl: ModalController, private keyboard: Keyboard, private alertCtrl: AlertController) {

  }
  ionViewDidEnter(){
    setTimeout(()=>{
        this.keyboard.close();
          this.InputBarcode.setFocus();
    },0);
    setTimeout(()=>{
        this.InputBarcode.setFocus();
        this.keyboard.close();
    },100);
  }
  updateScroll() {
      console.log('updating scroll')
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 300)
    }

  doGetClient(){
    let profileModal = this.modalCtrl.create("CilentmodelPage");
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        this.oClient = data.client_no;
      });
  }
  doGetItemNo(oClient){
    let profileModal = this.modalCtrl.create("ItemNomodalPage", { oClient: oClient });
      profileModal.present();
      profileModal.onDidDismiss(data =>{
        console.log(data);
        this.oItem = data.itemNo;
        this.oDes = data.description;

        this.doGetGrade(oClient, this.oItem);
        // this.oGrade = data.default_grade;
      });
  }
  doGetGrade(oClient, oItem){
    this.service.get_gradeInLocation(oClient, oItem).then((res)=>{
      this.data_grade = res;
      console.log(this.data_grade);
      if(this.data_grade.length <= 0){
        this.Alert('Error', 'ไม่พบข้อมูล');
      }else{
        this.oGrade = this.data_grade["0"].grade;
        setTimeout(()=>{
            this.keyboard.close();
            this.InputBarcode.setFocus();
        },0);
        setTimeout(()=>{
            this.InputBarcode.setFocus();
            this.keyboard.close();
        },1000);
      }
    })
  }
  doGetItem(oClient, oItem){
    this.service.get_showitemlist(oClient,this.oReceiptNO,this.oPONo,oItem).then((res)=>{
      this.data_showlist = res;
      console.log(this.data_showlist);
      if(this.data_showlist.length <= 0){
        this.Alert('Error', 'ไม่พบข้อมูล');
      }else{
        this.oDes = this.data_showlist["0"].description;
        //
        // this.GetDetail(oClient, oItem);
        // this.doGetGrade(oClient, oItem);
      }
    })
  }
  doGetBarcode(oClient, oBarcode){
    this.service.get_Item_Barcode(oClient, oBarcode).then((res)=>{
      this.data_getBarcode = res;
      console.log(this.data_getBarcode);
      if(this.data_getBarcode.length <= 0){
        this.Alert('Error', 'ไม่พบข้อมูล');
      }else{
        this.oItem = this.data_getBarcode["0"].item_no;
        this.oDes = this.data_getBarcode["0"].description;


        this.doGetUOM(oClient, this.oItem);
        this.doGetGrade_Item(oClient, this.oItem);

        this.GetDetail(oClient, this.oItem, "", "");
      }
    })
  }
  doGetUOM(oClient, oItem){
    this.service.get_ItemListUOM(oClient, oItem).then((res)=>{
      this.data_uom = res;
      console.log(this.data_uom);
      this.oUOM = this.data_uom["0"].uom;
    })
  }
  doGetGrade_Item(oClient, oItem){
    this.service.get_ItemListGrade(oClient, oItem).then((res)=>{
      this.data_grade = res;
      console.log(this.data_grade);
      this.oGrade = this.data_grade["0"].grade;
    })
  }
  GetDetail(oClient,oItem, oGrade, oUOM){
    console.log(oClient,oItem, oGrade, oUOM);
    this.service.Get_ItemLocationsGrade(oClient,oItem, oGrade, oUOM).then((res)=>{
      this.data_item = res;
      console.log(this.data_item);

      console.log(this.data_item.length);
      var total = 0;
      for(let i=0; i < this.data_item.length ; i++){
        var qty = +this.data_item[i].qty;
        total = total + qty;

        console.log(total);
      }
      this.oQty = total;
    })
  }
  doClear(){
    this.oDes = "";
    this.oBarcode = "";
    this.oItem = "";
    this.oGrade = null;
    this.data_showlist = [];
    this.data_item = [];
    this.oQty = "";
    this.data_uom = [];
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
